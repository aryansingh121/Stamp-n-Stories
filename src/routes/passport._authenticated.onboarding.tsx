import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SUGGESTED_INTERESTS, TRAVEL_VIBES } from "@/lib/passport";
import { uploadPassportPhoto, signedPhotoUrl, uploadIdProof } from "@/lib/photo";
import { toast } from "sonner";
import { Loader2, Upload, ShieldCheck } from "lucide-react";
import { logUserActivity } from "@/lib/logger";

export const Route = createFileRoute("/passport/_authenticated/onboarding")({
  component: Onboarding,
});

function Onboarding() {
  const nav = useNavigate();
  const { data: me, refetch } = useQuery({
    queryKey: ["me-profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", u.user.id)
        .maybeSingle();
      return data;
    },
  });

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<string>("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [cantStop, setCantStop] = useState("");
  const [ig, setIg] = useState("");
  const [vibe, setVibe] = useState<string>("");
  const [photoPath, setPhotoPath] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [idProofPath, setIdProofPath] = useState<string | null>(null);
  const [idProofName, setIdProofName] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (me) {
      setFullName(me.full_name || "");
      setAge(me.age?.toString() || "");
      setCity(me.city || "");
      setInterests(me.interests || []);
      setCantStop(me.cant_stop_doing || "");
      setIg(me.instagram || "");
      setVibe(me.travel_vibe || "");
      setPhotoPath(me.photo_url);
      setIdProofPath(me.id_proof_url || null);
      if (me.id_proof_url) setIdProofName("ID proof uploaded");
      if (me.photo_url) signedPhotoUrl(me.photo_url).then((u) => u && setPhotoPreview(u));
    }
  }, [me]);

  function toggleInterest(i: string) {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].slice(0, 8),
    );
  }
  function addInterest() {
    const v = interestInput.trim();
    if (v && !interests.includes(v)) {
      setInterests((p) => [...p, v].slice(0, 8));
      setInterestInput("");
    }
  }

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5 MB");
      return;
    }
    setUploading(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");
      const path = await uploadPassportPhoto(u.user.id, file);
      setPhotoPath(path);
      const url = await signedPhotoUrl(path);
      if (url) setPhotoPreview(url);
      logUserActivity({ action: "Profile Photo Upload" });
      toast.success("Photo uploaded");
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("Photo upload error:", err);
      }
      let errorMessage = "Upload failed. Please try again.";
      if (err instanceof Error && err.message) {
        errorMessage = typeof err.message === "string" ? err.message : JSON.stringify(err.message);
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage =
          typeof (err as any).message === "string"
            ? (err as any).message
            : JSON.stringify((err as any).message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  }

  async function onIdProof(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Max 8 MB");
      return;
    }
    const okType = /^(image\/|application\/pdf)/.test(file.type);
    if (!okType) {
      toast.error("Upload an image or PDF");
      return;
    }
    setUploadingId(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");
      const path = await uploadIdProof(u.user.id, file);
      setIdProofName(file.name);
      logUserActivity({ action: idProofPath ? "ID Proof Replacement" : "ID Proof Upload" });
      setIdProofPath(path);
      toast.success("ID proof uploaded");
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("ID proof upload error:", err);
      }
      let errorMessage = "Upload failed. Please try again.";
      if (err instanceof Error && err.message) {
        errorMessage = typeof err.message === "string" ? err.message : JSON.stringify(err.message);
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage =
          typeof (err as any).message === "string"
            ? (err as any).message
            : JSON.stringify((err as any).message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      toast.error(errorMessage);
    } finally {
      setUploadingId(false);
    }
  }

  async function save() {
    if (!fullName || !age || !city) {
      toast.error("Name, age, and city are required");
      return;
    }
    if (!photoPath) {
      toast.error("Please upload a profile photo");
      return;
    }
    if (!idProofPath) {
      toast.error("Please upload an ID proof for verification");
      return;
    }
    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          age: parseInt(age, 10),
          city,
          interests,
          cant_stop_doing: cantStop,
          instagram: ig || null,
          travel_vibe: vibe || null,
          photo_url: photoPath,
          id_proof_url: idProofPath,
          submitted: true,
        })
        .eq("id", u.user.id);
      if (error) throw error;
      logUserActivity({
        action: "Profile Update",
        metadata: { city, age, interests_count: interests.length },
      });
      toast.success("Submitted! Pending verification.");
      await refetch();
      nav({ to: "/passport/passport" });
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("Save profile error:", err);
      }
      let errorMessage = "Save failed. Please try again.";
      if (err instanceof Error && err.message) {
        errorMessage = typeof err.message === "string" ? err.message : JSON.stringify(err.message);
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage =
          typeof (err as any).message === "string"
            ? (err as any).message
            : JSON.stringify((err as any).message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-3xl sm:text-4xl">Build your passport</h1>
        <p className="mt-1 text-sm text-ink/60">
          For passport applicants: admin review is used before passports are made public.
        </p>

        <div className="mt-6 space-y-6 rounded-3xl border border-ink/10 bg-card p-6">
          {/* Photo */}
          <div>
            <Label>Profile photo *</Label>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-24 w-20 overflow-hidden rounded-lg border-2 border-ink/20 bg-muted">
                {photoPreview ? (
                  <img src={photoPreview} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-ink/30 text-xs">
                    No photo
                  </div>
                )}
              </div>
              <label className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-2 text-sm hover:bg-muted">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPhoto}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fn">Full name *</Label>
              <Input id="fn" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="ag">Age *</Label>
              <Input
                id="ag"
                type="number"
                min={13}
                max={99}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="ct">City *</Label>
              <Input id="ct" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Interests / hobbies (up to 8)</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUGGESTED_INTERESTS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleInterest(i)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    interests.includes(i)
                      ? "bg-coral text-primary-foreground"
                      : "bg-muted text-ink/70 hover:bg-sun/60"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                placeholder="Add custom interest"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
              />
              <Button type="button" variant="outline" onClick={addInterest}>
                Add
              </Button>
            </div>
            {interests.length > 0 && (
              <div className="mt-2 text-xs text-ink/50">Selected: {interests.join(", ")}</div>
            )}
          </div>

          <div>
            <Label htmlFor="cs">One thing you can't stop doing</Label>
            <Textarea
              id="cs"
              rows={2}
              value={cantStop}
              onChange={(e) => setCantStop(e.target.value)}
              placeholder="e.g. hosting brunches, chasing sunsets, hunting the best filter coffee…"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ig">Instagram (optional)</Label>
              <Input
                id="ig"
                value={ig}
                onChange={(e) => setIg(e.target.value)}
                placeholder="@yourhandle"
              />
            </div>
            <div>
              <Label>Your vibe (optional)</Label>
              <select
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Pick your vibe</option>
                {TRAVEL_VIBES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-coral/40 bg-sun/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-coral mt-0.5 shrink-0" />
              <div className="flex-1">
                <Label className="text-sm">ID proof for verification *</Label>
                <p className="mt-1 text-xs text-ink/60">
                  Upload a government ID (Aadhaar, Passport, Driver's License, etc.). Image or PDF,
                  max 8 MB. Only admins can view it. After verification, it will be automatically deleted after 10 days.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-ink/30 bg-background px-4 py-2 text-sm hover:bg-muted">
                    {uploadingId ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    {idProofPath ? "Replace ID proof" : "Upload ID proof"}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      onChange={onIdProof}
                      disabled={uploadingId}
                    />
                  </label>
                  {idProofPath && (
                    <span className="text-xs text-emerald-700 font-medium">
                      ✓ {idProofName || "Uploaded"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={save}
            disabled={saving}
            className="w-full rounded-full bg-coral hover:bg-coral/90 text-primary-foreground h-11"
          >
            {saving ? "Saving…" : "Submit for verification"}
          </Button>
        </div>
      </main>
    </div>
  );
}
