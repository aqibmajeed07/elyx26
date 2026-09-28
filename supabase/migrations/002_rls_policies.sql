-- 002_rls_policies.sql
-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform
-- Row Level Security (RLS) Policies

-- Helper function to check if current user is admin without recursive RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 1. PROFILES POLICIES
-- ============================================================
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

-- Users can insert their own profile on signup
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update own profile (except role)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND (role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
  );

-- Admins have full access to profiles
CREATE POLICY "Admins have full access to profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- ============================================================
-- 2. EVENTS POLICIES
-- ============================================================
-- Public can view events that are active
CREATE POLICY "Public can view events"
  ON public.events FOR SELECT
  USING (true);

-- Admins can insert, update, delete events
CREATE POLICY "Admins can insert events"
  ON public.events FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update events"
  ON public.events FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete events"
  ON public.events FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- 3. COORDINATORS POLICIES
-- ============================================================
-- Public can view coordinators
CREATE POLICY "Public can view coordinators"
  ON public.coordinators FOR SELECT
  USING (true);

-- Admins can manage coordinators
CREATE POLICY "Admins can insert coordinators"
  ON public.coordinators FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update coordinators"
  ON public.coordinators FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete coordinators"
  ON public.coordinators FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- 4. REGISTRATIONS POLICIES
-- ============================================================
-- Students or guests can create a registration if event registration is open
CREATE POLICY "Anyone can register for open events"
  ON public.registrations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE id = event_id
        AND status = 'registration_open'
        AND (registration_deadline IS NULL OR timezone('utc'::text, now()) <= registration_deadline)
    )
  );

-- Students can view their own registration; Admins can view all registrations
CREATE POLICY "Students can view own registration, admins can view all"
  ON public.registrations FOR SELECT
  USING (
    (auth.uid() IS NOT NULL AND student_id = auth.uid())
    OR public.is_admin()
  );

-- Only admins can update registrations (e.g., mark as confirmed/cancelled)
CREATE POLICY "Admins can update registrations"
  ON public.registrations FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admins can delete registrations
CREATE POLICY "Admins can delete registrations"
  ON public.registrations FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- 5. ANNOUNCEMENTS POLICIES
-- ============================================================
CREATE POLICY "Public can view announcements"
  ON public.announcements FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage announcements"
  ON public.announcements FOR ALL
  USING (public.is_admin());
