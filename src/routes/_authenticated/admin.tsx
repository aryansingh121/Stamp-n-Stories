import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Stamp as StampIcon, ShieldCheck, Search, FileCheck2 } from "lucide-react";
import { signedPhotoUrl, signedIdProofUrl } from "@/lib/photo";


export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) throw redirect({ to: "/auth" });
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", u.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!data) throw redirect({ to: "/passport" });
  },
  component: AdminPage,
});

function AdminPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [stampOpen, setStampOpen] = useState<null | { id: string; name: string }>(null);
  const [stampEvent, setStampEvent] = useState("");
  const [stampEmoji, setStampEmoji] = useState("✦");

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const list = (profiles || []).filter((p) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return [
      p.full_name, p.city, p.traveller_code, p.age?.toString(), ...(p.interests || []),
    ].filter(Boolean).join(" ").toLowerCase().includes(s);
  });

  async function setStatus(id: string, status: "approved" | "rejected" | "pending") {
    const { error } = await supabase.from("profiles").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Marked ${status}`);
    qc.invalidateQueries({ queryKey: ["admin-profiles"] });
  }

  async function addStamp() {
    if (!stampOpen || !stampEvent.trim()) return;
    const profile = profiles?.find((p) => p.id === stampOpen.id);
    if (!profile) return;
    const stamps = [...(profile.stamps as any[] || []), {
      event: stampEvent.trim(),
      emoji: stampEmoji,
      date: new Date().toISOString(),
    }];
    const { error } = await supabase.from("profiles").update({
      stamps,
      points: (profile.points || 0) + 10,
    }).eq("id", stampOpen.id);
    if (error) return toast.error(error.message);
    toast.success("Stamp added");
    setStampOpen(null);
    setStampEvent("");
    qc.invalidateQueries({ queryKey: ["admin-profiles"] });
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="h-7 w-7 text-coral" />
          <h1 className="font-display text-3xl">Admin dashboard</h1>
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
            <Input className="pl-9" placeholder="Search name, city, code, age, interest" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="text-sm text-ink/60">
            {profiles?.length || 0} total · {profiles?.filter((p) => p.status === "pending" && p.submitted).length || 0} pending
          </div>
        </div>

        {isLoading ? <p className="text-ink/50">Loading…</p> : (
          <div className="grid gap-3">
            {list.map((p) => (
              <ProfileRow
                key={p.id}
                p={p}
                onApprove={() => setStatus(p.id, "approved")}
                onReject={() => setStatus(p.id, "rejected")}
                onReset={() => setStatus(p.id, "pending")}
                onStamp={() => setStampOpen({ id: p.id, name: p.full_name || "Member" })}
              />
            ))}
            {!list.length && <p className="text-ink/50 text-sm">No profiles match.</p>}
          </div>
        )}
      </main>

      <Dialog open={!!stampOpen} onOpenChange={(o) => !o && setStampOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add stamp for {stampOpen?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Event name</Label>
              <Input value={stampEvent} onChange={(e) => setStampEvent(e.target.value)} placeholder="Goa Trip · BLR Meetup · House Party 04" />
            </div>
            <div>
              <Label>Emoji</Label>
              <Input value={stampEmoji} onChange={(e) => setStampEmoji(e.target.value)} maxLength={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStampOpen(null)}>Cancel</Button>
            <Button onClick={addStamp} className="bg-coral text-primary-foreground">Add stamp</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProfileRow({
  p, onApprove, onReject, onReset, onStamp,
}: {
  p: any; onApprove: () => void; onReject: () => void; onReset: () => void; onStamp: () => void;
}) {
  const [img, setImg] = useState<string | null>(null);
  useEffect(() => {
    if (p.photo_url) signedPhotoUrl(p.photo_url).then((u) => u && setImg(u));
  }, [p.photo_url]);

  const statusColor = p.status === "approved" ? "bg-green-600 text-white"
    : p.status === "rejected" ? "bg-destructive text-destructive-foreground"
    : "bg-sun text-ink";

  return (
    <div className="rounded-2xl border border-ink/10 bg-card p-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:items-center">
      <div className="h-14 w-12 shrink-0 rounded-md overflow-hidden bg-muted border border-ink/20">
        {img && <img src={img} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 sm:flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-display truncate">{p.full_name || "—"}</div>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ${statusColor}`}>{p.status}</span>
          {!p.submitted && <span className="text-[10px] text-ink/40">(draft)</span>}
        </div>
        <div className="text-xs text-ink/60 truncate">
          {p.traveller_code} · {p.city || "—"} · age {p.age || "—"} · {(p.stamps as any[] || []).length} stamps
        </div>
        {p.interests?.length > 0 && (
          <div className="text-[11px] text-ink/50 truncate">{p.interests.join(", ")}</div>
        )}
      </div>
      <div className="col-span-3 sm:col-span-1 flex flex-wrap gap-1.5 justify-end">
        {p.id_proof_url && (
          <Button
            size="sm"
            variant="outline"
            className="border-coral text-coral"
            onClick={async () => {
              const u = await signedIdProofUrl(p.id_proof_url);
              if (u) window.open(u, "_blank", "noopener,noreferrer");
              else toast.error("Could not load ID proof");
            }}
          >
            <FileCheck2 className="h-3.5 w-3.5" />ID
          </Button>
        )}
        {p.status !== "approved" && (
          <Button size="sm" variant="outline" className="border-green-600 text-green-700" onClick={onApprove}>
            <CheckCircle2 className="h-3.5 w-3.5" />Approve
          </Button>
        )}
        {p.status !== "rejected" && (
          <Button size="sm" variant="outline" className="border-destructive text-destructive" onClick={onReject}>
            <XCircle className="h-3.5 w-3.5" />Reject
          </Button>
        )}
        {p.status !== "pending" && (
          <Button size="sm" variant="ghost" onClick={onReset}>Reset</Button>
        )}
        <Button size="sm" variant="outline" onClick={onStamp}>
          <StampIcon className="h-3.5 w-3.5" />Stamp
        </Button>
      </div>

    </div>
  );
}
