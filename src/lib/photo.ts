import { supabase } from "@/integrations/supabase/client";

const BUCKET = "passport-photos";
const ID_BUCKET = "id-proofs";

export async function uploadPassportPhoto(userId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${userId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || `image/${ext}`,
  });
  if (error) throw error;
  return path;
}

export async function uploadIdProof(userId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${userId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(ID_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || `image/${ext}`,
  });
  if (error) throw error;
  return path;
}

const urlCache = new Map<string, { url: string; exp: number }>();

export async function signedPhotoUrl(path: string | null | undefined): Promise<string | null> {
  if (!path) return null;
  const now = Date.now();
  const hit = urlCache.get(path);
  if (hit && hit.exp > now) return hit.url;
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60 * 24 * 7);
  if (error || !data) return null;
  urlCache.set(path, { url: data.signedUrl, exp: now + 1000 * 60 * 60 * 24 * 6 });
  return data.signedUrl;
}

export async function signedIdProofUrl(path: string | null | undefined): Promise<string | null> {
  if (!path) return null;
  const { data, error } = await supabase.storage.from(ID_BUCKET).createSignedUrl(path, 60 * 60);
  if (error || !data) return null;
  return data.signedUrl;
}
