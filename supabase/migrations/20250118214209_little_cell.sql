-- Drop and recreate artworks table with correct structure
DROP TABLE IF EXISTS artworks CASCADE;

CREATE TABLE artworks (
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
  status text DEFAULT 'available',
  current_owner text DEFAULT 'Artist',
  edition_info jsonb DEFAULT null,
  last_sale jsonb DEFAULT null,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_visibility CHECK (visibility IN ('active', 'private')),
  CONSTRAINT valid_status CHECK (status IN ('available', 'sold', 'in_progress')),
  CONSTRAINT valid_type CHECK (type IN ('painting', 'sculpture', 'photography', 'digital', 'other')),
  CONSTRAINT valid_dimensions CHECK (
    jsonb_typeof(dimensions) = 'object' 
    AND dimensions ? 'height' 
    AND dimensions ? 'width' 
    AND dimensions ? 'unit'
  )
);

-- Create indexes for better performance
CREATE INDEX idx_artworks_artist_id ON artworks(artist_id);
CREATE INDEX idx_artworks_visibility ON artworks(visibility);
CREATE INDEX idx_artworks_status ON artworks(status);

-- Enable RLS
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Artists can manage their own artworks"
  ON artworks FOR ALL
  USING (auth.uid() = artist_id);

-- Grant permissions
GRANT ALL ON artworks TO authenticated;