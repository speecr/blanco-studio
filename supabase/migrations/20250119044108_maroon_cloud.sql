-- Add new columns for storing settings
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS payout_settings jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS studio_visit_settings jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS marketplace_settings jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS shipping_settings jsonb DEFAULT '{}'::jsonb;

-- Add check constraints
ALTER TABLE profiles
ADD CONSTRAINT valid_payout_settings
CHECK (jsonb_typeof(payout_settings) = 'object');

ALTER TABLE profiles
ADD CONSTRAINT valid_studio_visit_settings
CHECK (jsonb_typeof(studio_visit_settings) = 'object');

ALTER TABLE profiles
ADD CONSTRAINT valid_marketplace_settings
CHECK (jsonb_typeof(marketplace_settings) = 'object');

ALTER TABLE profiles
ADD CONSTRAINT valid_shipping_settings
CHECK (jsonb_typeof(shipping_settings) = 'object');