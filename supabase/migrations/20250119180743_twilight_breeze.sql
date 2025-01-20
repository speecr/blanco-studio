-- Drop existing invoices table
DROP TABLE IF EXISTS invoices CASCADE;

-- Recreate invoices table with proper structure and relationships
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  number text NOT NULL UNIQUE,
  artwork_id uuid REFERENCES artworks(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL,  -- No foreign key to contacts
  amount numeric NOT NULL,
  status text DEFAULT 'draft',
  due_date date,
  shipping jsonb,
  notes text,
  buyer_info jsonb NOT NULL,  -- Store buyer info directly
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'pending', 'paid', 'overdue')),
  CONSTRAINT valid_shipping CHECK (
    shipping IS NULL OR (
      jsonb_typeof(shipping) = 'object'
      AND (shipping->>'required' IS NULL OR jsonb_typeof(shipping->'required') = 'boolean')
      AND (shipping->>'cost' IS NULL OR jsonb_typeof(shipping->'cost') = 'number')
    )
  ),
  CONSTRAINT valid_buyer_info CHECK (
    jsonb_typeof(buyer_info) = 'object'
    AND buyer_info ? 'name'
    AND buyer_info ? 'email'
  )
);

-- Create indexes
CREATE INDEX idx_invoices_seller_id ON invoices(seller_id);
CREATE INDEX idx_invoices_artwork_id ON invoices(artwork_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- Enable RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Artists can manage their own invoices"
  ON invoices FOR ALL
  USING (auth.uid() = seller_id);

-- Grant permissions
GRANT ALL ON invoices TO authenticated;