-- Create team users with proper error handling
DO $$ 
DECLARE
  kunal_id uuid := 'd0d8d7d6-a111-4ec1-b2e9-e324f0b65268';
  will_id uuid := 'd1d8d7d6-b222-4ec1-b2e9-e324f0b65269';
  spencer_id uuid := 'd2d8d7d6-c333-4ec1-b2e9-e324f0b65270';
  jenny_id uuid := 'd3d8d7d6-d444-4ec1-b2e9-e324f0b65271';
  existing_id uuid;
BEGIN
  -- First check for existing users by email and get their IDs
  SELECT id INTO existing_id FROM auth.users WHERE email = 'kunalgandhi99@gmail.com';
  IF existing_id IS NULL THEN
    INSERT INTO auth.users (
      id, email, encrypted_password, email_confirmed_at, 
      raw_user_meta_data, role, created_at, is_sso_user
    )
    VALUES (
      kunal_id, 
      'kunalgandhi99@gmail.com', 
      crypt('defaultpass123', gen_salt('bf')), 
      NOW(), 
      '{"name":"Kunal"}',
      'authenticated',
      NOW(),
      false
    );
  ELSE
    kunal_id := existing_id;
  END IF;

  SELECT id INTO existing_id FROM auth.users WHERE email = 'will@blanco-art.com';
  IF existing_id IS NULL THEN
    INSERT INTO auth.users (
      id, email, encrypted_password, email_confirmed_at, 
      raw_user_meta_data, role, created_at, is_sso_user
    )
    VALUES (
      will_id,
      'will@blanco-art.com',
      crypt('defaultpass123', gen_salt('bf')),
      NOW(),
      '{"name":"Will Brossman"}',
      'authenticated',
      NOW(),
      false
    );
  ELSE
    will_id := existing_id;
  END IF;

  SELECT id INTO existing_id FROM auth.users WHERE email = 'spencer@blanco-art.com';
  IF existing_id IS NULL THEN
    INSERT INTO auth.users (
      id, email, encrypted_password, email_confirmed_at, 
      raw_user_meta_data, role, created_at, is_sso_user
    )
    VALUES (
      spencer_id,
      'spencer@blanco-art.com',
      crypt('defaultpass123', gen_salt('bf')),
      NOW(),
      '{"name":"Spencer Chandlee"}',
      'authenticated',
      NOW(),
      false
    );
  ELSE
    spencer_id := existing_id;
  END IF;

  SELECT id INTO existing_id FROM auth.users WHERE email = 'hello@blanco-art.com';
  IF existing_id IS NULL THEN
    INSERT INTO auth.users (
      id, email, encrypted_password, email_confirmed_at, 
      raw_user_meta_data, role, created_at, is_sso_user
    )
    VALUES (
      jenny_id,
      'hello@blanco-art.com',
      crypt('defaultpass123', gen_salt('bf')),
      NOW(),
      '{"name":"Jenny (AI Assistant)"}',
      'authenticated',
      NOW(),
      false
    );
  ELSE
    jenny_id := existing_id;
  END IF;

  -- Wait a moment to ensure auth triggers complete
  PERFORM pg_sleep(1);

  -- Now create or update profiles using the correct IDs
  INSERT INTO profiles (id, email, name, avatar_url, role)
  VALUES 
    (
      kunal_id, 
      'kunalgandhi99@gmail.com', 
      'Kunal', 
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Kunal', 
      'team'
    ),
    (
      will_id,
      'will@blanco-art.com',
      'Will Brossman',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Will',
      'team'
    ),
    (
      spencer_id,
      'spencer@blanco-art.com',
      'Spencer Chandlee',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Spencer',
      'team'
    ),
    (
      jenny_id,
      'hello@blanco-art.com',
      'Jenny (AI Assistant)',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny',
      'team'
    )
  ON CONFLICT (id) DO UPDATE 
  SET 
    name = EXCLUDED.name,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role;

END $$;