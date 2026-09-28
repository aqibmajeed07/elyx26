-- 009_security_hardening.sql
-- Fix search_path on update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$;

-- Secure handle_new_user so it cannot be called via RPC
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;

-- Secure promote_user_to_admin so only service_role / postgres can call it
REVOKE EXECUTE ON FUNCTION public.promote_user_to_admin(text) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.promote_user_to_admin(text) TO service_role;

-- Secure is_admin function from anon RPC
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
