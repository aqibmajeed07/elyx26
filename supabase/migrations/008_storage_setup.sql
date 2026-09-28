-- 008_storage_setup.sql
-- Storage bucket for event assets, banners, and documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-assets', 'event-assets', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Public Access event-assets'
  ) THEN
    CREATE POLICY "Public Access event-assets" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'event-assets');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Admins can upload event-assets'
  ) THEN
    CREATE POLICY "Admins can upload event-assets" 
    ON storage.objects FOR ALL 
    USING (bucket_id = 'event-assets' AND public.is_admin())
    WITH CHECK (bucket_id = 'event-assets' AND public.is_admin());
  END IF;
END $$;
