import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { passportLevel, type ProfileLike } from "@/lib/passport";
import { Trophy, Medal } from "lucide-react";

export const Route = createFileRoute("/passport/_authenticated/leaderboard")({
  component: Leaderboard,
});

function Leaderboard() {
  const { data } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id,traveller_code,full_name,city,stamps,points")
        .eq("status", "approved")
        .limit(100);
      return (data || [])
        .map((p) => ({
          ...p,
          stampCount: Array.isArray(p.stamps) ? p.stamps.length : 0,
        }))
        .sort((a, b) => b.stampCount - a.stampCount || (b.points || 0) - (a.points || 0))
        .slice(0, 50);
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center gap-3">
          <Trophy className="h-7 w-7 text-coral" />
          <h1 className="font-display text-3xl sm:text-4xl">Leaderboard</h1>
        </div>
        <p className="mt-1 text-sm text-ink/60">Most active travellers in the community.</p>

        <div className="mt-6 space-y-2">
          {(data || []).map((p, i) => {
            const level = passportLevel({ stamps: p.stamps as ProfileLike["stamps"] });
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-card p-3"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper font-display">
                  {i < 3 ? (
                    <Medal className="h-4 w-4 text-sun" />
                  ) : (
                    <span className="text-sm">{i + 1}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display truncate">{p.full_name || "Traveller"}</div>
                  <div className="text-xs text-ink/60 truncate">
                    {p.city} · {p.traveller_code}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-coral text-lg leading-none">{p.stampCount}</div>
                  <div className="text-[10px] uppercase tracking-widest text-ink/50">
                    {level.name}
                  </div>
                </div>
              </div>
            );
          })}
          {!data?.length && <p className="text-ink/50 text-sm">No approved travellers yet.</p>}
        </div>
      </main>
    </div>
  );
}
