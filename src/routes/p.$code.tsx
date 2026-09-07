import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PassportCard, type PassportData } from "@/components/PassportCard";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";
import { InstagramQR } from "@/components/InstagramQR";

export const Route = createFileRoute("/p/$code")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.code} — Stamp & Stories` },
      { name: "description", content: "A community traveller passport." },
      { property: "og:title", content: `${params.code} — Community Passport` },
      { property: "og:description", content: "View this traveller's stamps and vibe." },
    ],
  }),
  errorComponent: () => <NotFound />,
  notFoundComponent: () => <NotFound />,
  component: PublicPassport,
});

function NotFound() {
  return (
    <div className="min-h-screen bg-background grid place-items-center px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl">Passport not found</h1>
        <p className="mt-2 text-ink/60">This passport doesn't exist or hasn't been approved yet.</p>
        <Button asChild className="mt-4 rounded-full bg-coral text-primary-foreground">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

function PublicPassport() {
  const { code } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["public-passport", code],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("traveller_code", code)
        .eq("status", "approved")
        .maybeSingle();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <p className="text-ink/60">Loading…</p>
      </div>
    );
  }
  if (!data) return <NotFound />;

  const passport: PassportData = {
    id: data.id,
    traveller_code: data.traveller_code,
    full_name: data.full_name,
    age: data.age,
    city: data.city,
    interests: data.interests || [],
    cant_stop_doing: data.cant_stop_doing,
    instagram: data.instagram,
    travel_vibe: data.travel_vibe,
    photo_url: data.photo_url,
    status: data.status,
    issued_at: data.issued_at,
    stamps: (data.stamps as Array<{ event: string; emoji: string; date: string }>) || [],
  };

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/p/${code}` : `/p/${code}`;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-ink/10 bg-paper/85 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-primary-foreground">
              <Plane className="h-4 w-4" />
            </span>
            <span className="font-display">
              stamp<span className="text-coral">&</span>stories
            </span>
          </Link>
          <Button asChild size="sm" className="rounded-full bg-ink text-paper hover:bg-coral">
            <Link to="/auth">Get yours</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl">{data.full_name}'s passport</h1>
          <p className="text-sm text-ink/60">Verified member · {data.traveller_code}</p>
        </div>
        <PassportCard data={passport} shareUrl={shareUrl} />
        {data.instagram && (
          <div className="mt-6">
            <InstagramQR handle={data.instagram} />
          </div>
        )}
      </main>
    </div>
  );
}
