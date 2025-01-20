-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table first since it's referenced by other tables
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  role text DEFAULT 'artist',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table after profiles
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  read boolean DEFAULT false,
  thread_id uuid REFERENCES messages(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  artist_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  medium text,
  dimensions jsonb DEFAULT '{"height": 0, "width": 0, "unit": "in"}'::jsonb,
  year integer,
  images text[] DEFAULT ARRAY[]::text[],
  listing_price numeric,
  visibility text DEFAULT 'private',
  current_owner text DEFAULT 'Artist',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  type text NOT NULL,
  status text DEFAULT 'potential',
  priority_score integer DEFAULT 0,
  total_purchases integer DEFAULT 0,
  notes text,
  owned_artworks jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create studio_visits table
CREATE TABLE IF NOT EXISTS studio_visits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  collector_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  status text DEFAULT 'pending',
  reason text,
  reminders jsonb DEFAULT '{"email": true, "sms": false}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create commissions table
CREATE TABLE IF NOT EXISTS commissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  collector_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  request_details jsonb NOT NULL,
  price numeric,
  deposit numeric,
  status text DEFAULT 'new',
  priority text DEFAULT 'normal',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  number text NOT NULL UNIQUE,
  artwork_id uuid REFERENCES artworks(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  buyer_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  status text DEFAULT 'draft',
  due_date date,
  shipping jsonb,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id uuid REFERENCES artworks(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  buyer_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  tracking_number text,
  carrier text,
  status text DEFAULT 'preparing',
  shipping_address jsonb,
  estimated_delivery date,
  special_instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create function to handle auth user creation
CREATE OR REPLACE FUNCTION handle_auth_user_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (
    id,
    email,
    name,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    CASE 
      WHEN NEW.email IN (
        'kunalgandhi99@gmail.com',
        'will@blanco-art.com',
        'spencer@blanco-art.com',
        'hello@blanco-art.com'
      ) THEN 'team'
      ELSE 'artist'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for auth user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_user_created();

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view messages they're involved in"
  ON messages FOR SELECT USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Artists can manage their own artworks"
  ON artworks FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage their own contacts"
  ON contacts FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage their own studio visits"
  ON studio_visits FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage their own commissions"
  ON commissions FOR ALL USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage their own invoices"
  ON invoices FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Artists can manage their own shipments"
  ON shipments FOR ALL USING (auth.uid() = seller_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_artworks_artist_id ON artworks(artist_id);
CREATE INDEX IF NOT EXISTS idx_contacts_artist_id ON contacts(artist_id);
CREATE INDEX IF NOT EXISTS idx_studio_visits_artist_id ON studio_visits(artist_id);
CREATE INDEX IF NOT EXISTS idx_commissions_artist_id ON commissions(artist_id);
CREATE INDEX IF NOT EXISTS idx_invoices_seller_id ON invoices(seller_id);
CREATE INDEX IF NOT EXISTS idx_shipments_seller_id ON shipments(seller_id);

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;