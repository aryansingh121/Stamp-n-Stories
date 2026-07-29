import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { squadScore, travelPersonality } from "@/lib/passport";
import { useEffect, useState } from "react";
import { signedPhotoUrl } from "@/lib/photo";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/discover")({
  component: Discover,
});

function Discover() {
  const [q, setQ] = useState("");

  const { data: me } = useQuery({
    queryKey: ["me-discover"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", u.user.id).maybeSingle();
      return data;
    },
  });

  const { data: others } = useQuery({
    queryKey: ["discover-list"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id,traveller_code,full_name,city,age,interests,travel_vibe,photo_url,cant_stop_doing")
        .eq("status", "approved")
        .limit(60);
      return data || [];
    },
  });

  const list = (others || [])
    .filter((o) => o.id !== me?.id)
    .filter((o) =>
      !q ||
      o.full_name?.toLowerCase().includes(q.toLowerCase()) ||
      o.city?.toLowerCase().includes(q.toLowerCase()) ||
      (o.interests || []).some((i: string) => i.toLowerCase().includes(q.toLowerCase()))
    )
    .map((o) => ({ ...o, score: me ? squadScore(me as any, o as any) : 0 }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-display text-3xl sm:text-4xl">Find your squad</h1>
        <p className="mt-1 text-sm text-ink/60">Approved travellers ranked by vibe match.</p>
        <Input className="mt-4 max-w-sm" placeholder="Search by name, city, interest" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.length === 0 && <p className="text-ink/50 text-sm">No matches yet.</p>}
          {list.map((p) => <SquadCard key={p.id} p={p} />)}
        </div>
      </main>
    </div>
  );
}

function SquadCard({ p }: { p: any }) {
  const [img, setImg] = useState<string | null>(null);
  useEffect(() => {
    if (p.photo_url) signedPhotoUrl(p.photo_url).then((u) => u && setImg(u));
  }, [p.photo_url]);

  return (
    <Link
      to="/p/$code"
      params={{ code: p.traveller_code }}
      className="block rounded-2xl border border-ink/10 bg-card p-4 hover:shadow-card transition"
    >
      <div className="flex gap-3">
        <div className="h-16 w-14 rounded-md overflow-hidden bg-muted border border-ink/20">
          {img && <img src={img} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="font-display truncate">{p.full_name || "Traveller"}</div>
            <span className="rounded-full bg-coral text-primary-foreground px-2 py-0.5 text-[10px] font-display">
              {p.score}% match
            </span>
          </div>
          <div className="text-xs text-ink/60 truncate">{p.city} · {travelPersonality(p)}</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {(p.interests || []).slice(0, 3).map((i: string) => (
              <span key={i} className="rounded-full bg-sun/60 px-1.5 py-0.5 text-[10px]">{i}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
