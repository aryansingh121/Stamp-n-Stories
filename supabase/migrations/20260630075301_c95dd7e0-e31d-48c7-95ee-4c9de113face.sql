
-- Replace overly-permissive admin update policy
DROP POLICY IF EXISTS "admins update all profiles" ON public.profiles;
CREATE POLICY "admins update all profiles" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Lock down SECURITY DEFINER function execution
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- authenticated needs has_role for RLS policy evaluation, keep it.

-- Storage policies for passport-photos bucket
CREATE POLICY "anyone can read passport photos"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'passport-photos');

CREATE POLICY "authenticated can upload own photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'passport-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "authenticated can update own photos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'passport-photos' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'passport-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "authenticated can delete own photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'passport-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
