-- 013_pass_lookup_function.sql
-- Secure RPC function for self-service pass lookup by register number
CREATE OR REPLACE FUNCTION public.lookup_passes_by_reg_no(target_reg_no TEXT)
RETURNS TABLE (
  id UUID,
  event_id TEXT,
  event_title TEXT,
  student_id UUID,
  full_name TEXT,
  register_number TEXT,
  department TEXT,
  year TEXT,
  college TEXT,
  participation_type TEXT,
  team_name TEXT,
  team_members JSONB,
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
    r.college,
    r.participation_type,
    r.team_name,
    r.team_members,
    r.status,
    r.created_at
  FROM public.registrations r
  LEFT JOIN public.events e ON e.id = r.event_id
  WHERE UPPER(TRIM(r.register_number)) = UPPER(TRIM(target_reg_no));
$$;

GRANT EXECUTE ON FUNCTION public.lookup_passes_by_reg_no(TEXT) TO anon, authenticated, service_role;
