import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Plane, BadgeCheck, Stamp, Users, Sparkles, QrCode } from "lucide-react";

export const Route = createFileRoute("/passport/")({
  head: () => ({
    meta: [
      { title: "Stamp & Stories — your digital community passport" },
      { name: "description", content: "One passport for every community member. Collect stamps at trips, city meetups, house parties and more — and find your squad." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="paper-texture absolute inset-0 -z-10" />
          <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-display uppercase tracking-widest">
              <BadgeCheck className="h-3 w-3 text-coral" /> Community Verified
            </div>
            <h1 className="mt-6 font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight">
              Your community<br />
              <span className="text-coral">passport</span>, for every{" "}
              <span className="font-script text-coral text-6xl sm:text-8xl">hangout.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-ink/70">
              Trips, city meetups, house parties, jam sessions — one passport for every
              member. Build yours in 60 seconds. Collect a stamp every time you show up.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-coral hover:bg-coral/90 text-primary-foreground px-7">
                <Link to="/auth">Get my passport →</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-ink/30 px-7">
                <Link to="/leaderboard">See leaderboard</Link>
              </Button>
            </div>
            <div className="mt-12 flex justify-center gap-8 text-xs uppercase tracking-widest text-ink/50 font-display">
              <span>Trips</span>
              <span>·</span>
              <span>Meetups</span>
              <span>·</span>
              <span>House parties</span>
            </div>
          </div>

          {/* Floating stamps decoration */}
          <div className="absolute left-6 top-32 hidden sm:block stamp-ring stamp-ring--tilt stamp-fade rounded-full px-4 py-2 text-xs">BLR Meetup · 2026</div>
          <div className="absolute right-8 top-44 hidden sm:block stamp-ring stamp-ring--tilt-r stamp-fade rounded-full px-4 py-2 text-xs">House Party 04</div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl sm:text-4xl text-center">Built for the community.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Stamp, t: "Stamps for everything", d: "Trips, city meetups, house parties, jam nights — every check-in earns a stamp." },
              { icon: BadgeCheck, t: "Verified by admin", d: "Every passport is reviewed and stamped Community Verified." },
              { icon: Users, t: "Squad compatibility", d: "Discover members who match your vibe and interests." },
              { icon: QrCode, t: "Scannable QR", d: "Drop your passport in a story or chat. One scan opens your profile." },
              { icon: Sparkles, t: "Your personality", d: "Auto-generated: The Connector, The Party Starter, The Food Hunter and more." },
              { icon: Plane, t: "Levels & leaderboard", d: "New Member → Elite Member. Most active members get featured." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-ink/10 bg-card p-5 hover:shadow-card transition-shadow">
                <Icon className="h-5 w-5 text-coral" />
                <h3 className="mt-3 font-display text-lg">{t}</h3>
                <p className="mt-1 text-sm text-ink/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 pb-24 text-center">
          <div className="rounded-3xl bg-ink text-paper p-10 sm:p-14">
            <h2 className="font-display text-3xl sm:text-5xl">Ready to get stamped?</h2>
            <p className="mt-3 text-paper/70">It's free. It's fun. And your face is going on a passport.</p>
            <Button asChild size="lg" className="mt-6 rounded-full bg-coral hover:bg-coral/90 text-primary-foreground px-7">
              <Link to="/auth">Create my passport</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-ink/10 py-6 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} stamp & stories · community passport
      </footer>
    </div>
  );
}
