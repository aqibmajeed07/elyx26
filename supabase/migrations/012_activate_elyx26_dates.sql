-- 012_activate_elyx26_dates.sql
-- Update festival event dates and deadlines for active ELYX 26 registration
UPDATE public.events
SET 
  event_date = (event_date + interval '2 years')::date,
  registration_deadline = (registration_deadline + interval '2 years')::timestamptz;
