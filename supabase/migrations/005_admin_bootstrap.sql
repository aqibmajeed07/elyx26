-- 005_admin_bootstrap.sql
-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform
-- Secure Admin Bootstrap and User Registration Handler

-- 1. Automatically create a public profile entry when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    register_number,
    department,
    year,
    phone,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'register_number',
    NEW.raw_user_meta_data->>'department',
    NEW.raw_user_meta_data->>'year',
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    register_number = COALESCE(EXCLUDED.register_number, profiles.register_number),
    department = COALESCE(EXCLUDED.department, profiles.department),
    year = COALESCE(EXCLUDED.year, profiles.year),
    phone = COALESCE(EXCLUDED.phone, profiles.phone);
  RETURN NEW;
END;
$$;

-- Drop and recreate the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Privileged function to promote an existing registered account to 'admin'
-- Can be executed securely by Supabase Admin / Service Role or directly in Supabase SQL editor:
-- SELECT public.promote_user_to_admin('admin@gcetly.ac.in');
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(target_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = target_email;
  
  IF v_user_id IS NULL THEN
    RETURN 'User with email ' || target_email || ' does not exist in auth.users. Please sign up the admin user first.';
  END IF;

  UPDATE public.profiles
  SET role = 'admin'
  WHERE id = v_user_id;

  RETURN 'Successfully promoted ' || target_email || ' to administrator.';
END;
$$;
