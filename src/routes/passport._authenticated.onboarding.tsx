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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts normal Indian mobile numbers (+91, 0, or 10 digits with spaces/dashes) or standard international format
const PHONE_REGEX = /^(?:(?:\+|0{0,2})91[\s-]*)?[6-9]\d{9}$|^[+]?[0-9\s-]{10,15}$/;

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
      return {
        profile: data,
        authUser: u.user,
      };
    },
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (me?.profile) {
      const p = me.profile;
      setFullName(p.full_name || "");
      setEmail(p.email || me.authUser?.email || "");
      setPhone(p.phone || (me.authUser?.user_metadata?.phone as string) || "");
      setAge(p.age?.toString() || "");
      setCity(p.city || "");
      setInterests(p.interests || []);
      setCantStop(p.cant_stop_doing || "");
      setIg(p.instagram || "");
      setVibe(p.travel_vibe || "");
      setPhotoPath(p.photo_url);
      setIdProofPath(p.id_proof_url || null);
      if (p.id_proof_url) setIdProofName("ID proof uploaded");
      if (p.photo_url) signedPhotoUrl(p.photo_url).then((u) => u && setPhotoPreview(u));
    } else if (me?.authUser) {
      if (me.authUser.email) setEmail(me.authUser.email);
      if (me.authUser.user_metadata?.full_name) setFullName(me.authUser.user_metadata.full_name);
      if (me.authUser.user_metadata?.phone) setPhone(me.authUser.user_metadata.phone);
    }
  }, [me]);

  function validateField(field: string, value?: unknown): string | null {
    switch (field) {
      case "photo":
        if (!photoPath) return "No profile photo uploaded.";
        break;
      case "fullName": {
        const val = typeof value === "string" ? value : fullName;
        if (!val.trim()) return "Please enter your full name.";
        break;
      }
      case "age": {
        const val = typeof value === "string" ? value : age;
        const trimmed = val.trim();
        if (!trimmed) return "Please enter your age.";
        const num = parseInt(trimmed, 10);
        if (isNaN(num) || num < 13 || num > 99) {
          return "Age must be between 13 and 99.";
        }
        break;
      }
      case "city": {
        const val = typeof value === "string" ? value : city;
        if (!val.trim()) return "Please enter your city.";
        break;
      }
      case "email": {
        const val = typeof value === "string" ? value : email;
        const trimmed = val.trim();
        if (!trimmed) return "Please enter your email address.";
        if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
        break;
      }
      case "phone": {
        const val = typeof value === "string" ? value : phone;
        const trimmed = val.trim();
        if (!trimmed) return "Please enter your phone number.";
        const cleanDigits = trimmed.replace(/\D/g, "");
        if (cleanDigits.length < 10 || !PHONE_REGEX.test(trimmed)) {
          return "Please enter a valid phone number.";
        }
        break;
      }
      case "interests": {
        const arr = Array.isArray(value) ? value : interests;
        if (!arr || arr.length === 0) return "Please select at least one interest.";
        break;
      }
      case "cantStop": {
        const val = typeof value === "string" ? value : cantStop;
        if (!val.trim()) return "Please tell us one thing you can't stop doing.";
        break;
      }
      case "ig": {
        const val = typeof value === "string" ? value : ig;
        if (!val.trim()) return "Please enter your Instagram handle.";
        break;
      }
      case "vibe": {
        const val = typeof value === "string" ? value : vibe;
        if (!val || !val.trim()) return "Please provide your YouTube information.";
        break;
      }
      case "idProof":
        if (!idProofPath) return "Please upload your ID proof.";
        break;
    }
    return null;
  }

  function validateAll(): Record<string, string> {
    const errs: Record<string, string> = {};
    const fields = [
      "photo",
      "fullName",
      "age",
      "city",
      "email",
      "phone",
      "interests",
      "cantStop",
      "ig",
      "vibe",
      "idProof",
    ];
    for (const f of fields) {
      const err = validateField(f);
      if (err) errs[f] = err;
    }
    return errs;
  }

  function toggleInterest(i: string) {
    setInterests((prev) => {
      const next = prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i].slice(0, 8);
      const err = validateField("interests", next);
      setErrors((e) => ({ ...e, interests: err || "" }));
      return next;
    });
  }

  function addInterest() {
    const v = interestInput.trim();
    if (v && !interests.includes(v)) {
      setInterests((p) => {
        const next = [...p, v].slice(0, 8);
        const err = validateField("interests", next);
        setErrors((e) => ({ ...e, interests: err || "" }));
        return next;
      });
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
      setErrors((prev) => ({ ...prev, photo: "" }));
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
      setIdProofPath(path);
      setErrors((prev) => ({ ...prev, idProof: "" }));
      logUserActivity({ action: idProofPath ? "ID Proof Replacement" : "ID Proof Upload" });
      toast.success("ID proof uploaded");
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("ID proof upload error:", err);
      }
      let errorMessage = "Upload failed. Please try again.";
      if (err instanceof Error && err.message) {
        errorMessage = typeof err.message === "string" ? err.message : JSON.stringify(err.message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      toast.error(errorMessage);
    } finally {
      setUploadingId(false);
    }
  }

  async function save() {
    const newErrors = validateAll();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorMessage = Object.values(newErrors)[0];
      toast.error(firstErrorMessage);
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(firstKey) || document.querySelector(`[data-error-field="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSaving(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");

      const trimmedName = fullName.trim();
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPhone = phone.trim();
      const trimmedCity = city.trim();
      const trimmedCantStop = cantStop.trim();
      const trimmedIg = ig.trim();

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          age: parseInt(age, 10),
          city: trimmedCity,
          interests,
          cant_stop_doing: trimmedCantStop,
          instagram: trimmedIg,
          travel_vibe: vibe,
          photo_url: photoPath,
          id_proof_url: idProofPath,
          submitted: true,
        })
        .eq("id", u.user.id);

      if (error) throw error;

      // Also sync user metadata in auth if available
      try {
        await supabase.auth.updateUser({
          data: {
            full_name: trimmedName,
            phone: trimmedPhone,
          },
        });
      } catch {
        // Non-critical metadata sync
      }

      logUserActivity({
        action: "Profile Update",
        metadata: { city: trimmedCity, age: parseInt(age, 10), interests_count: interests.length },
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
          <div data-error-field="photo">
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
            {errors.photo && <p className="mt-1.5 text-xs text-destructive font-medium">{errors.photo}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full name *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                }}
                onBlur={() => {
                  const err = validateField("fullName");
                  if (err) setErrors((prev) => ({ ...prev, fullName: err }));
                }}
                placeholder="Your full name"
                required
              />
              {errors.fullName && <p className="mt-1 text-xs text-destructive font-medium">{errors.fullName}</p>}
            </div>

            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                min={13}
                max={99}
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  if (errors.age) setErrors((prev) => ({ ...prev, age: "" }));
                }}
                onBlur={() => {
                  const err = validateField("age");
                  if (err) setErrors((prev) => ({ ...prev, age: err }));
                }}
                placeholder="e.g. 25"
                required
              />
              {errors.age && <p className="mt-1 text-xs text-destructive font-medium">{errors.age}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                onBlur={() => {
                  const err = validateField("email");
                  if (err) setErrors((prev) => ({ ...prev, email: err }));
                }}
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="mt-1 text-xs text-destructive font-medium">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone number *</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                onBlur={() => {
                  const err = validateField("phone");
                  if (err) setErrors((prev) => ({ ...prev, phone: err }));
                }}
                placeholder="+91 98765 43210"
                required
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive font-medium">{errors.phone}</p>}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                }}
                onBlur={() => {
                  const err = validateField("city");
                  if (err) setErrors((prev) => ({ ...prev, city: err }));
                }}
                placeholder="e.g. Mumbai, Bangalore, Goa"
                required
              />
              {errors.city && <p className="mt-1 text-xs text-destructive font-medium">{errors.city}</p>}
            </div>
          </div>

          <div data-error-field="interests">
            <Label>Interests / hobbies * (up to 8)</Label>
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
            {errors.interests && <p className="mt-1.5 text-xs text-destructive font-medium">{errors.interests}</p>}
          </div>

          <div>
            <Label htmlFor="cantStop">One thing you can't stop doing *</Label>
            <Textarea
              id="cantStop"
              rows={2}
              value={cantStop}
              onChange={(e) => {
                setCantStop(e.target.value);
                if (errors.cantStop) setErrors((prev) => ({ ...prev, cantStop: "" }));
              }}
              onBlur={() => {
                const err = validateField("cantStop");
                if (err) setErrors((prev) => ({ ...prev, cantStop: err }));
              }}
              placeholder="e.g. hosting brunches, chasing sunsets, hunting the best filter coffee…"
              required
            />
            {errors.cantStop && <p className="mt-1 text-xs text-destructive font-medium">{errors.cantStop}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ig">Instagram *</Label>
              <Input
                id="ig"
                value={ig}
                onChange={(e) => {
                  setIg(e.target.value);
                  if (errors.ig) setErrors((prev) => ({ ...prev, ig: "" }));
                }}
                onBlur={() => {
                  const err = validateField("ig");
                  if (err) setErrors((prev) => ({ ...prev, ig: err }));
                }}
                placeholder="@yourhandle"
                required
              />
              {errors.ig && <p className="mt-1 text-xs text-destructive font-medium">{errors.ig}</p>}
            </div>
            <div>
              <Label htmlFor="vibe">YouTube *</Label>
              <select
                id="vibe"
                value={vibe}
                onChange={(e) => {
                  setVibe(e.target.value);
                  if (errors.vibe) setErrors((prev) => ({ ...prev, vibe: "" }));
                }}
                onBlur={() => {
                  const err = validateField("vibe");
                  if (err) setErrors((prev) => ({ ...prev, vibe: err }));
                }}
                className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                required
              >
                <option value="">Pick your vibe</option>
                {TRAVEL_VIBES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              {errors.vibe && <p className="mt-1 text-xs text-destructive font-medium">{errors.vibe}</p>}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-coral/40 bg-sun/10 p-4" data-error-field="idProof">
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
                {errors.idProof && <p className="mt-2 text-xs text-destructive font-medium">{errors.idProof}</p>}
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

