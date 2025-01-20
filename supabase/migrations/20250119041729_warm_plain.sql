/*
  # Add Profile Fields

  1. New Columns
    - phone (text)
    - website (text)
    - social_links (jsonb)
    - address_info (jsonb)

  2. Changes
    - Add new columns to profiles table
    - Add validation for social_links and address_info structure
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS address_info jsonb DEFAULT '{}'::jsonb;

-- Add check constraints for JSON structure
ALTER TABLE profiles
ADD CONSTRAINT valid_social_links 
CHECK (
  jsonb_typeof(social_links) = 'object' 
  AND (social_links IS NULL OR (
    (social_links->>'instagram' IS NULL OR jsonb_typeof(social_links->'instagram') = 'string') AND
    (social_links->>'twitter' IS NULL OR jsonb_typeof(social_links->'twitter') = 'string') AND
    (social_links->>'facebook' IS NULL OR jsonb_typeof(social_links->'facebook') = 'string') AND
    (social_links->>'linkedin' IS NULL OR jsonb_typeof(social_links->'linkedin') = 'string')
  ))
);

ALTER TABLE profiles
ADD CONSTRAINT valid_address_info
CHECK (
  jsonb_typeof(address_info) = 'object'
  AND (address_info IS NULL OR (
    (address_info->>'street' IS NULL OR jsonb_typeof(address_info->'street') = 'string') AND
    (address_info->>'city' IS NULL OR jsonb_typeof(address_info->'city') = 'string') AND
    (address_info->>'state' IS NULL OR jsonb_typeof(address_info->'state') = 'string') AND
    (address_info->>'zip' IS NULL OR jsonb_typeof(address_info->'zip') = 'string') AND
    (address_info->>'country' IS NULL OR jsonb_typeof(address_info->'country') = 'string')
  ))
);