-- ======================================================
-- ARTIFEX25 FULL DATABASE MIGRATION SCRIPT
-- Government College of Engineering, Tirunelveli
-- ======================================================

-- >>>>> FILE: supabase/migrations/001_initial_schema.sql <<<<<

-- 001_initial_schema.sql
-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform
-- Database Schema for PostgreSQL / Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  register_number TEXT,
  department TEXT,
  year TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  participation_type TEXT NOT NULL CHECK (participation_type IN ('individual', 'team')),
  team_size_min INT NOT NULL DEFAULT 1,
  team_size_max INT NOT NULL DEFAULT 1,
  event_date DATE,
  start_time TIME,
  end_time TIME,
  venue TEXT,
  registration_deadline TIMESTAMPTZ,
  description TEXT NOT NULL,
  rules JSONB NOT NULL DEFAULT '[]'::jsonb,
  faculty_incharge JSONB NOT NULL DEFAULT '[]'::jsonb,
  coordinators JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'registration_open' CHECK (status IN ('upcoming', 'registration_open', 'registration_closed', 'completed', 'cancelled')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Coordinators Table
CREATE TABLE IF NOT EXISTS public.coordinators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  department TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Event Coordinator',
  event_id TEXT REFERENCES public.events(id) ON DELETE SET NULL,
  committee_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  register_number TEXT NOT NULL,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL DEFAULT 'Government College of Engineering, Tirunelveli',
  participation_type TEXT NOT NULL CHECK (participation_type IN ('individual', 'team')),
  team_name TEXT,
  team_members JSONB NOT NULL DEFAULT '[]'::jsonb,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'waitlisted', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT uq_student_event_reg UNIQUE (register_number, event_id)
);

-- 5. Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Auto-update updated_at timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- >>>>> FILE: supabase/migrations/002_rls_policies.sql <<<<<

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


-- >>>>> FILE: supabase/migrations/003_indexes.sql <<<<<

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


-- >>>>> FILE: supabase/migrations/004_seed_events.sql <<<<<

-- 004_seed_events.sql
-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform
-- Verified Seed Data from Official Rulebook and Coordinator Rosters

-- Clear existing seed data safely if running re-seed
-- TRUNCATE public.events CASCADE;

-- 1. Seed Events (30 events)
INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'photography', 'photography', 'Photography', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'GCE Campus (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Capture the beauty and moments of GCE campus through your mobile camera lens. Evaluated based on creativity and perspective.',
  '["Candidates should participate individually.", "Photos should be taken only with mobile phones.", "Photos should be taken only inside GCE-campus.", "Photos should not be edited.", "Photos should be submitted with watermark.", "Files should be sent in JPEG format to artifex2k25@gmail.com.", "File naming format: Name-Year-Department (e.g., Arun-IV-CSE.jpeg).", "Deadline for submission: 05/05/2025. Submissions after deadline will not be validated."]'::jsonb, '[{"name": "Dr. E. Siva Sankari", "designation": "AsP/CSE"}, {"name": "Prof. G. Sona", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Nawin", "department": "ECE-A", "phone": "6385662945"}, {"name": "Jonathan", "department": "MECH", "phone": "7598150117"}, {"name": "Muthu Laksmi", "department": "CIVIL", "phone": "9159970274"}, {"name": "Suba Sri", "department": "EEE", "phone": "9361046360"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'video-making', 'video-making', 'Video Making', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'GCE Campus (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Create an engaging cinematic or creative video of the campus atmosphere within 30 seconds.',
  '["Candidates should participate individually.", "Videos can be taken with mobile phones only.", "Videos should be taken only inside GCE campus.", "Maximum time for a video: 30 seconds.", "Videos should be taken in landscape mode.", "Evaluated based on creativity and storytelling.", "Submit to artifex2k25@gmail.com with format Name-Year-Department.", "Deadline: 05/05/2025."]'::jsonb, '[{"name": "Dr. E. Mohamed Najeeb", "designation": "AP/CIVIL"}, {"name": "Prof. N. Jeenath Laila", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Rakesh Sharma", "department": "ECE-B", "phone": "9585207691"}, {"name": "Sanjay", "department": "CSE", "phone": "8825779929"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'meme-creation', 'meme-creation', 'Meme Creation', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'Online Submission (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Showcase your humor and wit through creative memes depicting Engineering college life.',
  '["Candidates should participate individually.", "The meme content should be about Engineering colleges.", "Video memes are not permitted.", "Files should be sent in JPEG format.", "The Meme must not be intended to hurt anyone in specific.", "Submit to artifex2k25@gmail.com with format Name-Year-Department.", "Deadline: 05/05/2025."]'::jsonb, '[{"name": "Dr. E. Mohamed Najeeb", "designation": "AP/CIVIL"}, {"name": "Prof. N. Jeenath Laila", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Aabith", "department": "CSE", "phone": "6382550569"}, {"name": "Vallarasu", "department": "ECE-B", "phone": "6374033827"}, {"name": "Abhina", "department": "EEE", "phone": "9384500262"}, {"name": "Suganthi", "department": "CIVIL", "phone": "9488044575"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'certificate-designing', 'certificate-designing', 'Certificate Designing', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'Online Submission (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Design the official participation and merit certificate for Artifex''25.',
  '["Candidates should participate individually.", "All details regarding Artifex’25 should be included.", "Files should be sent in PDF or PNG format.", "Certificate will be selected based on design quality and aesthetic balance.", "If there is any change in the content of the certificate it will be informed after selection.", "Submit to artifex2k25@gmail.com by 05/05/2025."]'::jsonb, '[{"name": "Dr. S. Supriya", "designation": "HOD/MECH"}, {"name": "Dr. S. Mariraj Mohan", "designation": "AsP/CIVIL"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Vengadesan", "department": "CSE", "phone": "6380188588"}, {"name": "Ananth", "department": "ECE-A", "phone": "6385822658"}, {"name": "Mohana Madubala", "department": "EEE", "phone": "9344086310"}, {"name": "Jeba Catharin", "department": "ECE-A", "phone": "9789112567"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'flex-designing', 'flex-designing', 'Flex Designing', 'Digital Events', 'individual',
  1, 1, '2025-05-05'::date, '09:00'::time, '17:00'::time,
  'Online Submission (Submit to artifex2k25@gmail.com)', '2025-05-05T23:59:59'::timestamptz, 'Design the official stage flex and banner for Artifex''25.',
  '["Candidates should participate individually.", "All details regarding Artifex’25 should be included such as Chief Guest Name, Event duration, and Culturals information.", "Files should be sent in PDF or PNG format.", "Flex will be selected based on design excellence.", "Submit to artifex2k25@gmail.com with format Name-Year-Department by 05/05/2025."]'::jsonb, '[{"name": "Dr. K. Thulasimani", "designation": "PROF/CSE"}, {"name": "Dr. S. Anbu Chudar Azhagan", "designation": "AsP/PHYSICS"}]'::jsonb, '[{"name": "Muthu Venkatesh", "department": "MECH IV Year", "phone": "770832176"}, {"name": "Srinidhi S", "department": "ECE IV Year", "phone": "6385434531"}, {"name": "Kedhar A", "department": "CSE", "phone": "9597799546"}, {"name": "Boopathi", "department": "CIVIL", "phone": "8124876926"}, {"name": "Navaneetha Krshinan", "department": "MECH", "phone": "8608926177"}, {"name": "Vinayagam", "department": "CSE", "phone": "8072838896"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'poetry', 'poetry', 'Poetry (கவிதை போட்டி)', 'Literary & Arts', 'individual',
  1, 1, '2025-04-21'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-20T23:59:59'::timestamptz, 'Express your thoughts and poetic brilliance. Topic will be given on the spot (போட்டியின் போது தலைப்பு வழங்கப்படும்).',
  '["Duration: 15 minutes.", "Paper will be provided.", "Mobile phones are strictly not allowed.", "Strictly no plagiarism."]'::jsonb, '[{"name": "Prof. V. Kumar", "designation": "AP/ENGLISH"}, {"name": "Dr. E. Esaiarasi", "designation": "AP/MATHS"}]'::jsonb, '[{"name": "Arun Kumar J", "department": "MECH IV Year", "phone": "9360850186"}, {"name": "Kokila", "department": "CIVIL IV Year", "phone": "8072517917"}, {"name": "Amala Akash", "department": "EEE", "phone": "80153183251"}, {"name": "Bowsihan", "department": "MECH", "phone": "9043364977"}, {"name": "Lakshmipriya", "department": "CSE", "phone": "9176719613"}, {"name": "Jerlin", "department": "ECE-A", "phone": "9047788847"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'essay-writing', 'essay-writing', 'Essay Writing (கட்டுரை போட்டி)', 'Literary & Arts', 'individual',
  1, 1, '2025-04-21'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-20T23:59:59'::timestamptz, 'Articulate deep perspectives, analytical prowess, and eloquence on a topical theme given on the spot.',
  '["Duration: 30 minutes.", "Topic will be given on the spot.", "Paper will be provided.", "Mobile phones not allowed.", "Strictly no plagiarism."]'::jsonb, '[{"name": "Prof. S. Muthupriya", "designation": "AP/ENGLISH"}, {"name": "Dr. J. Rajakumar", "designation": "AP/MATHS"}]'::jsonb, '[{"name": "Senthil Murugan", "department": "CIVIL IV Year", "phone": "9384365161"}, {"name": "Jeya Vinosha", "department": "CIVIL IV Year", "phone": "629268088"}, {"name": "Kalaiselvan", "department": "MECH-A", "phone": "6383419411"}, {"name": "Logesh Kumar", "department": "EEE", "phone": "8525940905"}, {"name": "Gnana Romie", "department": "ECE-A", "phone": "8220482102"}, {"name": "Madumitha", "department": "CSE", "phone": "9843235474"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'elocution', 'elocution', 'Elocution (பேச்சு போட்டி)', 'Literary & Arts', 'individual',
  1, 1, '2025-04-22'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-21T23:59:59'::timestamptz, 'Showcase your public speaking eloquence and persuasive oratory skills.',
  '["Duration: Maximum 5 minutes.", "Topic will be given on the spot.", "Do not carry any hints with you.", "Mobile phones not allowed while performing."]'::jsonb, '[{"name": "Dr. N. Suresh Babu", "designation": "AP/CHEMISTRY"}, {"name": "Prof. R. Meenakshi", "designation": "AP/PHYSICS"}]'::jsonb, '[{"name": "Nandhini N", "department": "CIVIL IV Year", "phone": "8754681101"}, {"name": "Anis Britto V", "department": "MECH IV Year", "phone": "9443655878"}, {"name": "Manikandan", "department": "EEE", "phone": "7603832177"}, {"name": "Padma", "department": "ECE-B", "phone": "7810021303"}, {"name": "Durga", "department": "CSE", "phone": "8438801404"}, {"name": "Hari Haran", "department": "CIVIL", "phone": "9344644058"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'drawing', 'drawing', 'Drawing', 'Literary & Arts', 'individual',
  1, 1, '2025-04-22'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-21T23:59:59'::timestamptz, 'Unleash your artistic imagination on canvas on a topic provided on the spot.',
  '["Duration: 1 Hour.", "Topic will be given on the spot.", "Pencil, crayons and paint are allowed.", "A3 sheet will be provided.", "Drawing essentials should be brought on your own.", "Mobile phones are not allowed."]'::jsonb, '[{"name": "Prof. P. Sureshkumar", "designation": "AP/MECH"}, {"name": "Prof. P. Prema", "designation": "AP/MECH"}]'::jsonb, '[{"name": "Shakthivelnathan", "department": "MECH IV Year", "phone": "9952624778"}, {"name": "Abinaya", "department": "ECE IV Year", "phone": "7550387120"}, {"name": "Thiyaga Thilipan", "department": "ECE-B", "phone": "9566733853"}, {"name": "Jeswin Israel", "department": "ECE-A", "phone": "9486558725"}, {"name": "Leona Amorita", "department": "MECH", "phone": "7708588899"}, {"name": "Rani", "department": "CSE", "phone": "7397151677"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'mimicry', 'mimicry', 'Mimicry', 'Theatre & Performance', 'individual',
  1, 1, '2025-04-23'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-22T23:59:59'::timestamptz, 'Imitate voices, sounds, personalities, and cinematic characters with humor and precision.',
  '["Duration: Maximum 5 minutes.", "Adult contents and controversial contents are strictly not allowed.", "Contents that offend our college faculties are not permitted."]'::jsonb, '[{"name": "Dr. A. Thangaraj", "designation": "AP/EEE"}, {"name": "Dr. M. Balasubramanian", "designation": "AP/EEE"}]'::jsonb, '[{"name": "Priya Dharshini", "department": "CSE IV Year", "phone": "9566473834"}, {"name": "Mohamed Mussammil Hussain KL", "department": "ECE IV Year", "phone": "8270359561"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'adzap', 'adzap', 'Adzap', 'Theatre & Performance', 'team',
  2, 10, '2025-04-24'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-23T23:59:59'::timestamptz, 'A comical advertisement performance where participants promote an imaginary/funny product of their choice with live voiceover.',
  '["Group event: Maximum number of persons allowed is 10.", "Duration: Maximum 10 minutes.", "Voiceover should be given for acting by anyone of the team members.", "Background audio is not allowed.", "Adult contents and controversial contents are not allowed."]'::jsonb, '[{"name": "Dr. M. Mahil", "designation": "AP/CSE"}, {"name": "Dr. D. Anitha", "designation": "AP/CSE"}]'::jsonb, '[{"name": "Vishal M", "department": "ECE IV Year", "phone": "9600369796"}, {"name": "Venu S", "department": "MECH IV Year", "phone": "8148054624"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'art-from-waste', 'art-from-waste', 'Art from Waste', 'Craft & Design', 'individual',
  1, 1, '2025-04-25'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-24T23:59:59'::timestamptz, 'Transform waste paper, cardboard, wood, glass, plastics, metals, and rubber into sustainable and economical works of art.',
  '["Duration: Maximum 45 minutes.", "Candidates should participate individually.", "Waste materials should be brought on your own.", "Art must be made at the given time inside the venue.", "All essential tools (scissors, glue, etc.) must be brought on your own."]'::jsonb, '[{"name": "Dr. M. Mohamen Younus", "designation": "AP/CIVIL"}, {"name": "Dr. M. Murugan", "designation": "AP/CIVIL"}]'::jsonb, '[{"name": "Hemalatha AR", "department": "EEE IV Year", "phone": "9363476818"}, {"name": "Ram Kumar K", "department": "ECE IV Year", "phone": "6369646209"}, {"name": "Barath", "department": "ECE-A", "phone": "9360502257"}, {"name": "Muthamil", "department": "MECH", "phone": "9342420694"}, {"name": "Saraswathi", "department": "CSE", "phone": "9094480344"}, {"name": "Barani", "department": "EEE", "phone": "7339555384"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'mime', 'mime', 'Mime', 'Theatre & Performance', 'team',
  2, 10, '2025-04-28'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-27T23:59:59'::timestamptz, 'Silent performing art conveying deep stories and social messages solely through facial expressions, body movements, and gestures.',
  '["Duration: Maximum 10 minutes.", "Maximum number of persons allowed: 10.", "Adult contents and controversial contents are strictly not allowed.", "Contents that offend college faculties are strictly not permitted."]'::jsonb, '[{"name": "Dr. M. Vijayaraj", "designation": "HOD/ECE"}, {"name": "Dr. E. Sivaraman", "designation": "AsP/ECE"}, {"name": "Prof. V. Selvakumar", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Magdalene Mary J", "department": "ECE IV Year", "phone": "8220620848"}, {"name": "Surya C", "department": "MECH IV Year", "phone": "6374629452"}, {"name": "Vijay Kumar", "department": "CSE", "phone": "6369345012"}, {"name": "Vijay", "department": "ECE-B", "phone": "6380239097"}, {"name": "Tamil Selvi", "department": "CIVIL", "phone": "9092264520"}, {"name": "Swetha Lakshmi", "department": "EEE", "phone": "8825543878"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'silambam', 'silambam', 'Silambam', 'Traditional Martial Arts', 'individual',
  1, 1, '2025-04-28'::date, '15:00'::time, '17:00'::time,
  'Admin Block', '2025-04-27T23:59:59'::timestamptz, 'Display traditional Tamil martial arts mastery, agile stick rotations, and rhythmic combat forms.',
  '["Duration: Maximum 2 minutes.", "Candidates should participate individually.", "Silambam sticks will be provided."]'::jsonb, '[{"name": "Prof. S. Somesh Subramanian", "designation": "AP/MECH"}, {"name": "Dr. S. Ananthakumar", "designation": "AP/MECH"}]'::jsonb, '[{"name": "Arul Selva Jayasurya", "department": "MECH IV Year", "phone": "9600933054"}, {"name": "Oviya V", "department": "ECE IV Year", "phone": "9363384527"}, {"name": "Ramkumar", "department": "ECE-B", "phone": "8015407335"}, {"name": "Vedha Sujith", "department": "ECE-B", "phone": "6379665181"}, {"name": "Maharaja", "department": "EEE", "phone": "9524669119"}, {"name": "Kaviya G", "department": "ECE-A", "phone": "9487194686"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'debate', 'debate', 'Debate', 'Literary & Arts', 'individual',
  1, 1, '2025-04-29'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-04-28T23:59:59'::timestamptz, 'Engage in dynamic, formal debates on contemporary themes. Best individual speakers will be awarded.',
  '["Topic will be given on the spot.", "All registered participants will be divided into two groups according to preference.", "Participants should put forward a formal discussion under the given topic.", "The best speakers will be selected as individuals on the basis of their debating skills.", "Mobile phones not allowed.", "Candidates are permitted to deliver their speech in colloquial way."]'::jsonb, '[{"name": "Dr. B. Paramasivam", "designation": "AsP/EEE"}, {"name": "Dr. G. Balasubramanian", "designation": "AP/EEE"}]'::jsonb, '[{"name": "Vignesh M", "department": "EEE IV Year", "phone": "9566642507"}, {"name": "Swathi", "department": "EEE IV Year", "phone": "6385592581"}, {"name": "Kishore G P", "department": "CSE", "phone": "6380658348"}, {"name": "Vishva", "department": "CIVIL", "phone": "8610425526"}, {"name": "Femi", "department": "CIVIL", "phone": "7708879903"}, {"name": "Gracy", "department": "EEE", "phone": "6382488936"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;



INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'drama', 'drama', 'Drama', 'Theatre & Performance', 'team',
  2, 10, '2025-05-05'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-05-04T23:59:59'::timestamptz, 'Theatrical stage drama bringing scripts, characters, emotions, and narratives to life.',
  '["Duration: 15 minutes.", "Maximum number of persons allowed: 10.", "Group can be formed within your year students or along with other year students but MUST be within your department.", "Background audios are not allowed.", "Adult contents and controversial contents are not allowed.", "Contents that offend college faculties are strictly not permitted.", "Properties needed for drama should be brought on your own.", "Boys and Girls combined performance NOT allowed.", "Proper dress code should be followed."]'::jsonb, '[{"name": "Dr. S. Ida Evangeline", "designation": "AP/EEE"}, {"name": "Prof. A. Renaldo Maximus", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Abinesh", "department": "ECE IV Year", "phone": "9629525907"}, {"name": "Dharshana", "department": "ECE IV Year", "phone": "9486062315"}, {"name": "Rahul", "department": "CSE", "phone": "8778154886"}, {"name": "Dinafrin Marshal", "department": "EEE", "phone": "7708489488"}, {"name": "Kowshika", "department": "CIVIL", "phone": "9486202421"}, {"name": "Kumudha", "department": "ECE-A", "phone": "9080862410"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'rangoli', 'rangoli', 'Rangoli', 'Craft & Design', 'team',
  1, 4, '2025-05-06'::date, '15:00'::time, '17:00'::time,
  'Admin Block', '2025-05-05T23:59:59'::timestamptz, 'Traditional Indian floor art of vibrant patterns and symmetric geometry using colored powders.',
  '["Duration: Maximum 2 hours.", "Maximum number of people allowed: 4.", "Rangoli powder should be brought on your own.", "Chalk piece will be provided."]'::jsonb, '[{"name": "Dr. I. Muthumani", "designation": "PROF/ECE"}, {"name": "Dr. P. E. Irin Dorathy", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Gayathri KR", "department": "EEE IV Year", "phone": "8838971137"}, {"name": "Shakthi Vignesh MS", "department": "MECH IV Year", "phone": "9489567504"}, {"name": "Yuva Shruthi", "department": "CSE", "phone": "9345998685"}, {"name": "Ramya K", "department": "ECE-B", "phone": "7010432609"}, {"name": "Shifana", "department": "CIVIL", "phone": "8610010920"}, {"name": "Abinaya", "department": "MECH", "phone": "9940993668"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'vegetable-carving', 'vegetable-carving', 'Vegetable Carving', 'Craft & Design', 'individual',
  1, 1, '2025-05-07'::date, '15:00'::time, '17:00'::time,
  'SSS Block & Exam Hall', '2025-05-06T23:59:59'::timestamptz, 'Intricate sculptural carving into fruits and vegetables creating ornamental pieces.',
  '["Duration: 45 minutes.", "Candidates should participate individually.", "Vegetables and other essential items (knife, toothpick, etc.) should be brought on your own."]'::jsonb, '[{"name": "Dr. M. Sabari", "designation": "AP/MATHS"}, {"name": "Dr. D. Cherine", "designation": "AP/PHYSICS"}]'::jsonb, '[{"name": "Alwin", "department": "CIVIL IV Year", "phone": "7305927703"}, {"name": "Shankarammal Sabitha K", "department": "EEE IV Year", "phone": "8778099137"}, {"name": "Sam Jenishion", "department": "MECH", "phone": "7845520405"}, {"name": "Preethi R K", "department": "ECE-B", "phone": "9342173108"}, {"name": "Vennila R", "department": "CSE", "phone": "8825955536"}, {"name": "Mussamil", "department": "CIVIL", "phone": "8838299107"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'solo-singing', 'solo-singing', 'Solo Singing', 'Music & Vocal', 'individual',
  1, 1, '2025-04-23'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-20T23:59:59'::timestamptz, 'Vocal solo performance showcasing melody, pitch, rhythm, and stage presence.',
  '["Preliminary round will be conducted based on the number of participants.", "Participants should be ready before 20/04/2025.", "There will be rehearsals.", "Duration: Maximum 5 minutes.", "Karaoke track should be submitted on or before 20/04/2025.", "Dancing is not permitted."]'::jsonb, '[{"name": "Dr. G. Tamil Pavai", "designation": "HOD/CSE"}, {"name": "Dr. J. Suganthi", "designation": "PROF/EEE"}]'::jsonb, '[{"name": "Abiksha", "department": "EEE IV Year", "phone": "6380111273"}, {"name": "Mukesh", "department": "MECH IV Year", "phone": "6381576318"}, {"name": "Ranjith Kumar", "department": "ECE-B", "phone": "6381587076"}, {"name": "Mugesh Kumar", "department": "EEE", "phone": "9345992247"}, {"name": "Vishnu C M", "department": "ECE-B", "phone": "9677807367"}, {"name": "Boomika", "department": "CIVIL", "phone": "9360805613"}, {"name": "Hema", "department": "MECH", "phone": "8438890190"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'group-singing', 'group-singing', 'Group Singing', 'Music & Vocal', 'team',
  2, 8, '2025-04-24'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-20T23:59:59'::timestamptz, 'Vocal ensemble harmony, choir, or mashup rendition with vocal synchrony.',
  '["Preliminary round will be conducted based on the number of participants.", "Participants should be ready before 20/04/2025 with rehearsals.", "Duration: Maximum 7 minutes.", "Karaoke track should be submitted on 20/04/2025.", "Boys and Girls combined performance IS allowed.", "Dancing is not permitted."]'::jsonb, '[{"name": "Dr. D. Jebakani", "designation": "PROF/MECH"}, {"name": "Dr. A. Krishnaveni", "designation": "PROF/MECH"}]'::jsonb, '[{"name": "Abiksha", "department": "EEE IV Year", "phone": "6380111273"}, {"name": "Mukesh", "department": "MECH IV Year", "phone": "6381576318"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'solo-dance', 'solo-dance', 'Solo Dance', 'Dance & Choreography', 'individual',
  1, 1, '2025-04-25'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-22T23:59:59'::timestamptz, 'Individual dance choreography showcasing rhythm, grace, energy, and expressions.',
  '["Preliminary round will be conducted based on the number of participants.", "Duration: Maximum 4 to 5 minutes.", "Dance audio must be submitted on or before 22/04/2025.", "Dance costume must be decent and informed to event coordinators on 22/04/2025.", "Boys and Girls combined performance is not allowed."]'::jsonb, '[{"name": "Dr. T. Seethalakshmi", "designation": "AP/CIVIL"}, {"name": "Dr. K. Padma Priya", "designation": "AP/ECE"}]'::jsonb, '[{"name": "Balamurugan R", "department": "CSE IV Year", "phone": "9597810859"}, {"name": "Amutha", "department": "CIVIL IV Year", "phone": "7339077216"}, {"name": "Prathap", "department": "CSE", "phone": "7094234189"}, {"name": "Deva", "department": "MECH", "phone": "6379843913"}, {"name": "Fathima", "department": "ECE-A", "phone": "8825753153"}, {"name": "Jotheeshwari", "department": "CIVIL", "phone": "7845293989"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'group-dance', 'group-dance', 'Group Dance', 'Dance & Choreography', 'team',
  2, 8, '2025-04-30'::date, '15:00'::time, '17:00'::time,
  'Auditorium / Stage', '2025-04-22T23:59:59'::timestamptz, 'High-octane group dance performance with synchronized choreographies, formations, and themes.',
  '["Preliminary round will be conducted based on the number of participants.", "Duration: Maximum 6 to 7 minutes.", "Maximum number of people allowed: 8.", "Dance audio must be submitted on or before 22/04/2025.", "Dance costume must be decent and informed to event coordinators on 22/04/2025.", "Boys and Girls combined performance is NOT allowed."]'::jsonb, '[{"name": "Dr. P. Subha Karuvelam", "designation": "PROF/EEE"}, {"name": "Dr. M. Gnana Sundari", "designation": "PROF/EEE"}]'::jsonb, '[{"name": "Balamurugan R", "department": "CSE IV Year", "phone": "9597810859"}, {"name": "Amutha", "department": "CIVIL IV Year", "phone": "7339077216"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'instrument-playing', 'instrument-playing', 'Instrument Playing', 'Music & Vocal', 'individual',
  1, 4, '2025-04-29'::date, '15:00'::time, '17:00'::time,
  'Exam Hall', '2025-04-27T23:59:59'::timestamptz, 'Live musical instrument performance displaying melody, technique, chords, or percussion rhythms.',
  '["Preliminary round will be conducted based on the number of participants.", "Duration: Maximum 4 minutes.", "Any instrument is allowed (Keyboard, Guitar, Violin, Drums, Flute, Mridangam, etc.).", "Boys and Girls combined performance allowed.", "Usage of any recorded audios is strictly not allowed."]'::jsonb, '[{"name": "Dr. J. John", "designation": "AsP/MATHS"}, {"name": "Dr. S. Sophie Beulah", "designation": "AsP/CHEMISTRY"}]'::jsonb, '[{"name": "Nesan Paul", "department": "ECE IV Year", "phone": "7092481555"}, {"name": "Kulasekara Lakshmi", "department": "CIVIL IV Year", "phone": "9344575074"}, {"name": "Seshu Ganesh", "department": "ECE-B", "phone": "9629956042"}, {"name": "Kannan S P", "department": "CSE", "phone": "9344889051"}, {"name": "Aathi Kesavan", "department": "CIVIL", "phone": "9342456754"}, {"name": "Maridhas", "department": "ECE-A", "phone": "7305798505"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'fireless-cooking', 'fireless-cooking', 'Fireless Cooking', 'Culinary & Lifestyle', 'team',
  1, 2, '2025-05-02'::date, '15:00'::time, '17:00'::time,
  'SSS Block', '2025-05-01T23:59:59'::timestamptz, 'Prepare delicious, nutritious, and innovative culinary dishes without any thermal heating or flame.',
  '["No electric appliances or stove flames allowed.", "Ingredients must be brought by the participants.", "Cleanliness and presentation will be judged.", "Time limit: 45 minutes."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Veera Bharathi", "department": "EEE", "phone": "6385657637"}, {"name": "Jenowin", "department": "CIVIL", "phone": "9042514044"}, {"name": "Akshya", "department": "CSE", "phone": "6379548209"}, {"name": "Pavithra", "department": "ECE-B", "phone": "9360783773"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'quiz', 'quiz', 'General & Cultural Quiz', 'Literary & Arts', 'team',
  2, 2, '2025-04-26'::date, '15:00'::time, '17:00'::time,
  'Exam Hall', '2025-04-25T23:59:59'::timestamptz, 'Test your intellect, pop culture, Tamil heritage, art, history, and current affairs knowledge.',
  '["Team of 2 members.", "Preliminary written round followed by buzzer finals.", "Mobile phones strictly prohibited during the quiz."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Aravind", "department": "CIVIL", "phone": "9442981307"}, {"name": "Mohammed", "department": "MECH", "phone": "9952507669"}, {"name": "Santhiya", "department": "CSE", "phone": "6381764603"}, {"name": "Akshaya", "department": "EEE", "phone": "7904632928"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'treasure-hunt', 'treasure-hunt', 'Treasure Hunt', 'Adventure & Fun', 'team',
  3, 4, '2025-05-03'::date, '14:30'::time, '17:00'::time,
  'Campus Grounds', '2025-05-02T23:59:59'::timestamptz, 'Decipher cryptic clues, solve riddles, and navigate across campus grounds to uncover the final prize.',
  '["Team size: 3-4 members.", "All clues must be retrieved in sequential order.", "Disruption to classes or campus property leads to instant disqualification."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Siva Sankar", "department": "CSE", "phone": "7010328022"}, {"name": "Hari Pranav", "department": "CIVIL", "phone": "9384455155"}, {"name": "Beautlin", "department": "EEE", "phone": "8883260365"}, {"name": "Pavithra", "department": "CSE", "phone": "9597910333"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'mehendi', 'mehendi', 'Mehendi Designing', 'Craft & Design', 'individual',
  1, 2, '2025-05-06'::date, '15:00'::time, '17:00'::time,
  'SSS Block', '2025-05-05T23:59:59'::timestamptz, 'Showcase intricate henna body art, Arabic patterns, and traditional Indian bridal designs.',
  '["Participant may bring one model on whose hand henna is applied.", "Mehendi cones must be brought by the participants.", "Pre-drawn patterns or stencils are strictly prohibited.", "Time duration: 1 hour."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Nandhini", "department": "CSE", "phone": "9894179538"}, {"name": "Sumu Priya", "department": "MECH", "phone": "9361191642"}, {"name": "Thilai Bala", "department": "CIVIL", "phone": "8610123913"}, {"name": "Rasinath Jamroon", "department": "ECE-B", "phone": "7418002264"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'fashion-show', 'fashion-show', 'Fashion Show / Traditional Walk', 'Theatre & Performance', 'individual',
  1, 1, '2025-05-08'::date, '15:00'::time, '17:30'::time,
  'College Auditorium', '2025-05-06T23:59:59'::timestamptz, 'Celebrate Indian cultural diversity, ethnic elegance, and thematic runway walks.',
  '["Team size: 4 - 10 members.", "Strict adherence to college dress code: vulgarity or indecent costumes will result in immediate disqualification.", "Soundtrack must be submitted 2 days in advance.", "Performance duration: 7 minutes."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Shrivarsan", "department": "ECE-B", "phone": "9360998412"}, {"name": "Durgesh Ramkumar", "department": "ECE-A", "phone": "9025565520"}, {"name": "Dhanush", "department": "MECH", "phone": "9025385431"}, {"name": "Jeswn", "department": "EEE", "phone": "9385716377"}]'::jsonb,
  'registration_open', true
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

INSERT INTO public.events (
  id, slug, title, category, participation_type, team_size_min, team_size_max,
  event_date, start_time, end_time, venue, registration_deadline, description,
  rules, faculty_incharge, coordinators, status, featured
) VALUES (
  'talent-hunt', 'talent-hunt', 'Talent Hunt', 'Theatre & Performance', 'individual',
  1, 2, '2025-05-07'::date, '15:00'::time, '17:00'::time,
  'SSS Block / Auditorium', '2025-05-05T23:59:59'::timestamptz, 'Any unique, extraordinary skill—beatboxing, magic, juggling, stand-up, speed art, or unique instrument.',
  '["Performance time: 3-5 minutes.", "Props must be brought by the participant.", "Hazardous materials or fire are strictly banned."]'::jsonb, '[{"name": "Faculty Incharge", "designation": "Fine Arts Association"}]'::jsonb, '[{"name": "Maheshwaran", "department": "CIVIL", "phone": "7904288968"}, {"name": "Shyam Roshan", "department": "ECE-B", "phone": "7010971796"}, {"name": "Absal", "department": "CSE", "phone": "8838669760"}, {"name": "Swetha", "department": "CIVIL", "phone": "8248814895"}]'::jsonb,
  'registration_open', false
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  rules = EXCLUDED.rules,
  faculty_incharge = EXCLUDED.faculty_incharge,
  coordinators = EXCLUDED.coordinators,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;


-- 2. Seed Coordinators from Committees & Overall List
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jonaham Marrion Elam', '9489470593', 'MECH A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Tychicus Samson S', '7904803731', 'MECH B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Naveen Raj V', '9487998285', 'CIVIL', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Litta Janet S', '9363472358', 'EEE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Arun Kapil M', '9360427143', 'CSE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Magdalene Mary J', '8220620848', 'ECE A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Udhayashree R', '8754351708', 'ECE B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Nakul', '7530042159', 'MECH-A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Hari Sankar', '9360807695', 'ECE-A', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sanil Kumar', '9042544654', 'ECE-B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Pavinthiran', '9655374901', 'CSE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Pawan Kumar', '9361485724', 'EEE', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Shasidharan', '9361794341', 'MECH-B', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Loga Dhanush', '9344796313', 'CIVIL', 'Overall Coordinator', 'Overall Coordinators')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Vishva', '8610425526', 'CIVIL', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kiran Jothi', '6374842921', 'EEE', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Deva', '6379843913', 'MECH', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Suganthi', '9488044575', 'CIVIL', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mamathi Dhas', '6383960164', 'CIVIL', 'Committee Member', 'Invitation preparation and Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kedhar', '9597799546', 'CSE', 'Committee Member', 'Banner and Certificate Printing Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Iyappan', '7538814967', 'ECE-A', 'Committee Member', 'Banner and Certificate Printing Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mussamil', '8838299107', 'CIVIL', 'Committee Member', 'Banner and Certificate Printing Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Monika', '6383509437', 'ECE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sankari', '9443531529', 'ECE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Barani N', '7339555384', 'EEE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Swetha Lakshmi', '8825543878', 'EEE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Akshaya', '7904632928', 'EEE', 'Committee Member', 'Reception Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jotheeswari', '7845293989', 'CIVIL', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Abdulla', '7871574585', 'MECH', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Amala Akash', '8015318251', 'EEE', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kishore', '6380658348', 'CSE', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Remi Edwin', '9677221177', 'CIVIL', 'Committee Member', 'Auditorium Hall and Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Pawan', '9361485724', 'EEE', 'Committee Member', 'Power Supply Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mugesh Kumar', '9345992247', 'EEE', 'Committee Member', 'Power Supply Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Vinothini', '9786356135', 'EEE', 'Committee Member', 'Power Supply Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Ganthan', '8190804948', 'CSE', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sanil', '9042544654', 'ECE', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Thillai Bala', '8610123913', 'CIVIL', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Swetha', '8248814895', 'CIVIL', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kiran Jothi', '6374842921', 'EEE', 'Committee Member', 'Chief Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Mari Eshwar', '9092825147', 'ECE-A', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kabilan R', '6382376593', 'EEE', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Thiyaga Thilipan', '9566733853', 'ECE-B', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Loga Dhanush S', '9344796313', 'CIVIL', 'Committee Member', 'Refreshment Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Esaki Shanmugam', '9442706048', 'CSE', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Maheshwaran', '7904288968', 'CIVIL', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jonathan', '7598150117', 'MECH', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Sam', '80724066992', 'CSE', 'Committee Member', 'Photography and Video Arrangement Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kanisk', '9487169629', 'CSE', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Manoj', '7871179650', 'ECE-A', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Dino', '7708489488', 'EEE', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Subash', '8489638803', 'CIVIL', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Murugan', '9629769575', 'MECH', 'Committee Member', 'Student Discipline and Crowd management Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Kaviya', '9487194686', 'ECE-A', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Jerona', '9384980739', 'ECE-A', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Santhya', '6381764603', 'CSE', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Nanthini', '9894179538', 'CSE', 'Committee Member', 'Certificate and Prize Distribution Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Harsha Varthini', '6383370780', 'ECE-A', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Munawara', '9042029866', 'CSE', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Ramsan Safrin', '9790870905', 'CSE', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Gomathi Ambika', '7826075758', 'CSE', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Femi', '7708879903', 'CIVIL', 'Committee Member', 'Cultural Events and Program Coordination Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Ariprasath', '9994353825', 'ECE-A', 'Committee Member', 'Media and News report Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Rakesh Sharma', '9585207691', 'ECE-B', 'Committee Member', 'Media and News report Committee')
ON CONFLICT DO NOTHING;
INSERT INTO public.coordinators (name, phone, department, role, committee_name)
VALUES ('Aabith', '6382550569', 'CSE', 'Committee Member', 'Media and News report Committee')
ON CONFLICT DO NOTHING;

-- 3. Initial Announcements
INSERT INTO public.announcements (title, content, category, is_pinned)
VALUES 
  ('Welcome to ARTIFEX''25!', 'Government College of Engineering, Tirunelveli presents ARTIFEX''25 organized by the Fine Arts Association from 21 April 2025 to 09 May 2025.', 'highlight', true),
  ('Digital Events Submissions Open', 'All digital event participants (Photography, Video Making, Meme Creation, Designing) must submit their entries to artifex2k25@gmail.com on or before 05/05/2025 with filename format: Name-Year-Department.', 'alert', true),
  ('Grand Finale Dress Code & Guidelines', 'All students should strictly follow the proper dress code on 09/05/2025: Chudidhar with compulsory shawl for girls, and formal college wear for boys. College ID cards are mandatory for all attendees.', 'info', false);


-- >>>>> FILE: supabase/migrations/005_admin_bootstrap.sql <<<<<

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


