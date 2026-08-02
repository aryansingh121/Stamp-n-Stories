import { Link, useRouterState } from "@tanstack/react-router";
import { Plane, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { logUserActivity } from "@/lib/logger";

export function AppHeader() {
  const { user, isAdmin } = useAuth();
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
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <img src="/logo.png" alt="Stamp & Stories" className="h-10 w-auto mix-blend-multiply" />
          <span className="font-serif text-xl md:text-2xl font-bold tracking-widest uppercase text-ink">
            STAMP<span className="text-coral">N</span>STORIES
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-5">
          {user && link("/passport/passport", "My Passport")}
          {user && link("/passport/discover", "Squad")}
          {user && link("/passport/leaderboard", "Leaderboard")}
          {isAdmin && link("/passport/admin", "Admin")}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                await logUserActivity({ action: "User Logout" });
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
          {link("/passport/passport", "Passport")}
          {link("/passport/discover", "Squad")}
          {link("/passport/leaderboard", "Leaders")}
          {isAdmin && link("/passport/admin", "Admin")}
        </div>
      )}
    </header>
  );
}
