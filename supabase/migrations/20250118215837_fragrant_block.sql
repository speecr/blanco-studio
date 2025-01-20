-- Create storage bucket for artwork images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('artwork-images', 'artwork-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Artists can upload artwork images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'artwork-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view artwork images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'artwork-images');

CREATE POLICY "Artists can update their artwork images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'artwork-images')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Artists can delete their artwork images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'artwork-images');

-- Grant usage on storage schema
GRANT USAGE ON SCHEMA storage TO authenticated;