-- 014_admin_registrations_and_role_fix.sql
-- Elevate administrator privileges and ensure registrations query works seamlessly

-- 1. Ensure profiles table has admin role for admin email addresses
UPDATE public.profiles
SET role = 'admin'
WHERE email IN ('elexgce2026@gmail.com', 'admin@gcetly.ac.in');

-- 2. Update is_admin() function to check both profiles and auth.users email
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND (role = 'admin' OR role = 'superadmin')
    )
    OR EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid() AND email IN ('elexgce2026@gmail.com', 'admin@gcetly.ac.in')
    )
  );
$$;

-- 3. Security definer function for administrators to fetch all registrations
CREATE OR REPLACE FUNCTION public.get_all_registrations_admin()
RETURNS TABLE (
  id UUID,
  event_id TEXT,
  event_title TEXT,
  student_id UUID,
  full_name TEXT,
  register_number TEXT,
  department TEXT,
  year TEXT,
  email TEXT,
  phone TEXT,
  college TEXT,
  participation_type TEXT,
  team_name TEXT,
  team_members JSONB,
  additional_notes TEXT,
  status TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT 
    r.id,
    r.event_id,
    e.title as event_title,
    r.student_id,
    r.full_name,
    r.register_number,
    r.department,
    r.year,
    r.email,
    r.phone,
    r.college,
    r.participation_type,
    r.team_name,
    r.team_members,
    r.additional_notes,
    r.status,
    r.created_at
  FROM public.registrations r
  LEFT JOIN public.events e ON e.id = r.event_id
  ORDER BY r.created_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.get_all_registrations_admin() TO anon, authenticated, service_role;
