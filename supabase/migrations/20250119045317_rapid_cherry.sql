/*
  # Storage Setup Migration
  
  1. Storage Buckets
    - Creates profile-images bucket
    - Creates artwork-images bucket
  
  2. Security
    - Sets up RLS policies for each bucket
    - Grants necessary permissions
*/

-- Create storage buckets
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('profile-images', 'profile-images', true)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO storage.buckets (id, name, public)
  VALUES ('artwork-images', 'artwork-images', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Profile Images Policies
DO $$
BEGIN
  -- Delete any existing policies
  DROP POLICY IF EXISTS "Users can upload their own profile images" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can view profile images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own profile images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own profile images" ON storage.objects;

  -- Create new policies
  CREATE POLICY "Users can upload their own profile images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

  CREATE POLICY "Anyone can view profile images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'profile-images');

  CREATE POLICY "Users can update their own profile images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

  CREATE POLICY "Users can delete their own profile images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
END $$;

-- Artwork Images Policies
DO $$
BEGIN
  -- Delete any existing policies
  DROP POLICY IF EXISTS "Users can upload artwork images" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can view artwork images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their artwork images" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their artwork images" ON storage.objects;

  -- Create new policies
  CREATE POLICY "Users can upload artwork images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'artwork-images');

  CREATE POLICY "Anyone can view artwork images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'artwork-images');

  CREATE POLICY "Users can update their artwork images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'artwork-images');

  CREATE POLICY "Users can delete their artwork images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'artwork-images');
END $$;

-- Grant necessary permissions
GRANT ALL ON SCHEMA storage TO authenticated;