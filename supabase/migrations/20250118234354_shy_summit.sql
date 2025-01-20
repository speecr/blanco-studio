-- Drop and recreate contacts table with correct structure
DROP TABLE IF EXISTS contacts CASCADE;

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  instagram text,
  type text NOT NULL,
  status text DEFAULT 'potential',
  priority_score integer DEFAULT 0,
  total_purchases integer DEFAULT 0,
  notes text,
  owned_artworks jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_type CHECK (type IN ('collector', 'gallery', 'curator')),
  CONSTRAINT valid_status CHECK (status IN ('active', 'potential', 'inactive'))
);

-- Create indexes for better performance
CREATE INDEX idx_contacts_artist_id ON contacts(artist_id);
CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_contacts_status ON contacts(status);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Artists can manage their own contacts"
  ON contacts FOR ALL
  USING (auth.uid() = artist_id);

-- Grant permissions
GRANT ALL ON contacts TO authenticated;