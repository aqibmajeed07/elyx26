-- 007_event_enhancements_and_cancellation_policy.sql
-- GEC Tirunelveli - ARTIFEX'25 Cultural Events Registration Platform

ALTER TABLE public.events 
  ADD COLUMN IF NOT EXISTS max_participants INT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS eligibility TEXT DEFAULT 'Open to all students of Government College of Engineering, Tirunelveli',
  ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT NULL;

-- Policy for students to cancel their own registration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'registrations' 
      AND policyname = 'Students can cancel own registration'
  ) THEN
    CREATE POLICY "Students can cancel own registration"
      ON public.registrations FOR UPDATE
      USING (auth.uid() IS NOT NULL AND student_id = auth.uid())
      WITH CHECK (
        auth.uid() IS NOT NULL AND student_id = auth.uid()
        AND status = 'cancelled'
      );
  END IF;
END $$;
