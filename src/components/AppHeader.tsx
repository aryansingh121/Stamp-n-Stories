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
        <nav className="hidden md:flex items-center gap-6">
          {user && link("/passport/passport", "My Passport")}
          {user && link("/passport/discover", "Squad")}
          {user && (
            <a
              href="https://chat.whatsapp.com/BdfvQOFIm4DEiseiXVwUwf?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-coral transition-colors text-ink/80 inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <svg className="h-4 w-4 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp Community</span>
            </a>
          )}
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
              className="text-ink/70 hover:text-ink hover:bg-ink/5"
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
        <div className="md:hidden border-t border-ink/10 px-4 py-2 flex items-center gap-4 overflow-x-auto text-sm no-scrollbar">
          {link("/passport/passport", "Passport")}
          {link("/passport/discover", "Squad")}
          <a
            href="https://chat.whatsapp.com/BdfvQOFIm4DEiseiXVwUwf?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-coral transition-colors text-ink/80 inline-flex items-center gap-1.5 shrink-0"
          >
            <svg className="h-3.5 w-3.5 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>WhatsApp Community</span>
          </a>
          {isAdmin && link("/passport/admin", "Admin")}
        </div>
      )}
    </header>
  );
}
