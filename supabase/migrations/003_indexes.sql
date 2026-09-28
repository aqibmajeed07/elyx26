-- 003_indexes.sql
-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform
-- Database Indexes for high-performance querying

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON public.events(category);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_featured ON public.events(featured);

-- Registrations indexes
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON public.registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_student_id ON public.registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_registrations_reg_no ON public.registrations(register_number);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_dept ON public.registrations(department);

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Coordinators indexes
CREATE INDEX IF NOT EXISTS idx_coordinators_event_id ON public.coordinators(event_id);
