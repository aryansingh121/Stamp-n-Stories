import { Link, useRouterState } from "@tanstack/react-router";
import { Plane, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin(user?.id);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium hover:text-coral transition-colors ${
        path === to ? "text-coral" : "text-ink/80"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-coral text-primary-foreground">
            <Plane className="h-4 w-4" />
          </span>
          <span className="font-display text-base sm:text-lg truncate">
            stamp<span className="text-coral">&</span>stories
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-5">
          {user && link("/passport", "My Passport")}
          {user && link("/discover", "Squad")}
          {user && link("/leaderboard", "Leaderboard")}
          {isAdmin && link("/admin", "Admin")}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <Button asChild size="sm" className="bg-ink text-paper hover:bg-ink/90">
              <Link to="/auth">Join</Link>
            </Button>
          )}
        </div>
      </div>
      {user && (
        <div className="md:hidden border-t border-ink/10 px-4 py-2 flex gap-4 overflow-x-auto text-sm">
          {link("/passport", "Passport")}
          {link("/discover", "Squad")}
          {link("/leaderboard", "Leaders")}
          {isAdmin && link("/admin", "Admin")}
        </div>
      )}
    </header>
  );
}
