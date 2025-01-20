-- Drop existing commissions table
DROP TABLE IF EXISTS commissions CASCADE;

-- Recreate commissions table with proper foreign key
CREATE TABLE commissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  collector_id uuid NOT NULL,  -- No foreign key to contacts table
  request_details jsonb NOT NULL,
  price numeric,
  deposit numeric,
  status text DEFAULT 'new',
  priority text DEFAULT 'normal',
  notes text,
  collector_info jsonb NOT NULL,  -- Store collector info directly
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('new', 'review', 'accepted', 'in_progress', 'completed', 'deferred', 'declined')),
  CONSTRAINT valid_priority CHECK (priority IN ('normal', 'urgent', 'rush')),
  CONSTRAINT valid_request_details CHECK (
    jsonb_typeof(request_details) = 'object'
    AND request_details ? 'type'
    AND request_details ? 'dimensions'
    AND request_details ? 'timeline'
  ),
  CONSTRAINT valid_collector_info CHECK (
    jsonb_typeof(collector_info) = 'object'
    AND collector_info ? 'name'
    AND collector_info ? 'email'
  )
);

-- Create indexes
CREATE INDEX idx_commissions_artist_id ON commissions(artist_id);
CREATE INDEX idx_commissions_status ON commissions(status);

-- Enable RLS
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Artists can manage their own commissions"
  ON commissions FOR ALL
  USING (auth.uid() = artist_id);

-- Grant permissions
GRANT ALL ON commissions TO authenticated;