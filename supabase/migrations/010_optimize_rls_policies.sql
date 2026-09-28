-- 010_optimize_rls_policies.sql
-- Optimizes RLS policies by wrapping auth.uid() in (SELECT auth.uid())

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING ((SELECT auth.uid()) = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING ((SELECT auth.uid()) = id)
  WITH CHECK (
    (SELECT auth.uid()) = id 
    AND (role = (SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) OR public.is_admin())
  );

DROP POLICY IF EXISTS "Students can view own registration, admins can view all" ON public.registrations;
CREATE POLICY "Students can view own registration, admins can view all"
  ON public.registrations FOR SELECT
  USING (
    ((SELECT auth.uid()) IS NOT NULL AND student_id = (SELECT auth.uid()))
    OR public.is_admin()
  );

DROP POLICY IF EXISTS "Students can cancel own registration" ON public.registrations;
CREATE POLICY "Students can cancel own registration"
  ON public.registrations FOR UPDATE
  USING ((SELECT auth.uid()) IS NOT NULL AND student_id = (SELECT auth.uid()))
  WITH CHECK (
    (SELECT auth.uid()) IS NOT NULL AND student_id = (SELECT auth.uid())
    AND status = 'cancelled'
  );
