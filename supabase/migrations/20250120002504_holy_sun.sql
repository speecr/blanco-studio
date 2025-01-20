-- Drop and recreate studio_visits table with correct structure
DROP TABLE IF EXISTS studio_visits CASCADE;

CREATE TABLE studio_visits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  artist_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  collector_info jsonb NOT NULL,  -- Store collector info directly
  date date NOT NULL,
  time time NOT NULL,
  status text DEFAULT 'pending',
  reason text,
  notes text,
  reminders jsonb DEFAULT '{"email": true, "sms": false}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  CONSTRAINT valid_collector_info CHECK (
    jsonb_typeof(collector_info) = 'object'
    AND collector_info ? 'name'
    AND collector_info ? 'email'
  )
);

-- Create indexes
CREATE INDEX idx_studio_visits_artist_id ON studio_visits(artist_id);
CREATE INDEX idx_studio_visits_date ON studio_visits(date);
CREATE INDEX idx_studio_visits_status ON studio_visits(status);

-- Enable RLS
ALTER TABLE studio_visits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Artists can manage their own studio visits"
  ON studio_visits FOR ALL
  USING (auth.uid() = artist_id);

-- Grant permissions
GRANT ALL ON studio_visits TO authenticated;