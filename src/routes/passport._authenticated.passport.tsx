import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { PassportCard, type PassportData } from "@/components/PassportCard";
import { Button } from "@/components/ui/button";
import { downloadPNG, downloadPDF } from "@/lib/download";
import { toast } from "sonner";
import { Download, FileText, Share2, Edit3, Clock, CheckCircle2, XCircle } from "lucide-react";
import { InstagramQR } from "@/components/InstagramQR";

export const Route = createFileRoute("/passport/_authenticated/passport")({
  component: MyPassport,
});

function MyPassport() {
  const nav = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["my-passport"],
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

  if (isLoading)
    return (
      <Shell>
        <p className="text-center text-ink/60 mt-16">Loading…</p>
      </Shell>
    );
  if (!profile)
    return (
      <Shell>
        <p className="text-center text-ink/60 mt-16">No profile yet.</p>
      </Shell>
    );

  if (!profile.submitted) {
    return (
      <Shell>
        <div className="mx-auto max-w-md text-center mt-10">
          <h1 className="font-display text-3xl">Almost there.</h1>
          <p className="mt-2 text-ink/60">Finish your details to generate your passport.</p>
          <Button
            onClick={() => nav({ to: "/passport/onboarding" })}
            className="mt-5 rounded-full bg-coral text-primary-foreground"
          >
            Complete profile
          </Button>
        </div>
      </Shell>
    );
  }

  const data: PassportData = {
    id: profile.id,
    traveller_code: profile.traveller_code,
    full_name: profile.full_name,
    age: profile.age,
    city: profile.city,
    interests: profile.interests || [],
    cant_stop_doing: profile.cant_stop_doing,
    instagram: profile.instagram,
    travel_vibe: profile.travel_vibe,
    photo_url: profile.photo_url,
    status: profile.status,
    issued_at: profile.issued_at,
    stamps: (profile.stamps as PassportData["stamps"]) || [],
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/p/${profile.traveller_code}`
      : `/p/${profile.traveller_code}`;

  const statusBadge =
    profile.status === "approved"
      ? { icon: CheckCircle2, label: "Approved", color: "bg-green-600 text-white" }
      : profile.status === "rejected"
        ? { icon: XCircle, label: "Rejected", color: "bg-destructive text-destructive-foreground" }
        : { icon: Clock, label: "Pending review", color: "bg-sun text-ink" };
  const Badge = statusBadge.icon;

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied!");
    } catch {
      toast.error("Copy failed");
    }
  }

  async function dl(kind: "png" | "pdf") {
    const el = containerRef.current?.querySelector("[data-download-root]") as HTMLElement | null;
    if (!el) return;
    try {
      if (kind === "png") await downloadPNG(el, `passport-${data.traveller_code}`);
      else await downloadPDF(el, `passport-${data.traveller_code}`);
    } catch (e: unknown) {
      toast.error((e as Error)?.message || "Download failed");
    }
  }

  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl">Your passport</h1>
            <div
              className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-display uppercase tracking-widest ${statusBadge.color}`}
            >
              <Badge className="h-3 w-3" /> {statusBadge.label}
            </div>
          </div>
          <div className="flex flex-wrap justify-start gap-2 sm:justify-end">
            <Button size="sm" variant="outline" onClick={() => nav({ to: "/passport/onboarding" })}>
              <Edit3 className="h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" variant="outline" onClick={copyShare}>
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button size="sm" variant="outline" onClick={() => dl("png")}>
              <Download className="h-4 w-4" />
              PNG
            </Button>
            <Button size="sm" variant="outline" onClick={() => dl("pdf")}>
              <FileText className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>

        {profile.status === "pending" && (
          <div className="mb-4 rounded-xl border border-sun bg-sun/30 p-3 text-sm">
            Your passport is awaiting admin approval. You can still edit, download, and share
            preview.
          </div>
        )}

        <div ref={containerRef} className="flex w-full justify-center">
          <div
            data-download-root
            className="flex w-full max-w-5xl flex-col items-center gap-4 rounded-[2rem] bg-background/70 p-2 sm:gap-5 sm:p-3 lg:gap-6 lg:p-4"
          >
            <PassportCard data={data} shareUrl={shareUrl} />
            {profile.instagram && <InstagramQR handle={profile.instagram} />}
          </div>
        </div>

        <div className="mt-4 text-center sm:mt-5">
          {profile.status === "approved" ? (
            <Link
              to="/p/$code"
              params={{ code: profile.traveller_code }}
              className="text-coral underline text-sm"
            >
              View public profile →
            </Link>
          ) : (
            <span className="text-xs text-ink/50">Public link activates after approval.</span>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
