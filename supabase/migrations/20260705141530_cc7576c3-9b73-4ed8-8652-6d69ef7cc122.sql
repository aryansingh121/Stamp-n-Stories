
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS id_proof_url text;

CREATE POLICY "users upload own id proof"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'id-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users read own id proof"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'id-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "users update own id proof"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'id-proofs' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "admins read all id proofs"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'id-proofs' AND public.has_role(auth.uid(), 'admin'));
