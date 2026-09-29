-- ======================================================
-- PRODUCTION CLEANUP SCRIPT
-- Run this in your Supabase SQL Editor before going to production
-- ======================================================

-- 1. Clear ALL registrations (test data)
DELETE FROM public.registrations;

-- 2. Remove Clay Modelling event and its coordinators
DELETE FROM public.coordinators WHERE event_id = 'clay-modelling';
DELETE FROM public.events WHERE id = 'clay-modelling';

-- 3. Update Fashion Show to individual (solo) participation
UPDATE public.events
SET
  participation_type = 'individual',
  team_size_min = 1,
  team_size_max = 1,
  updated_at = NOW()
WHERE id = 'fashion-show';

-- 4. Verify changes
SELECT 'Registrations remaining:' AS check_type, COUNT(*)::text AS result FROM public.registrations
UNION ALL
SELECT 'Clay Modelling exists:', COUNT(*)::text FROM public.events WHERE id = 'clay-modelling'
UNION ALL
SELECT 'Fashion Show type:', participation_type FROM public.events WHERE id = 'fashion-show';
