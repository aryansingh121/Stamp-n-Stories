import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logUserActivity } from "@/lib/logger";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const nav = useNavigate();
  const [message] = useState("Finishing sign-in...");

  useEffect(() => {
    let mounted = true;

    const navigateToError = (msg: string) => {
      if (!mounted) return;
      localStorage.removeItem("auth-redirect-pending");
      toast.error(msg);
      nav({ to: "/auth" });
    };

    const search = new URLSearchParams(window.location.search);
    const error = search.get("error");
    const errorDescription = search.get("error_description");
    const code = search.get("code");

    if (error) {
      navigateToError(errorDescription || error);
      return;
    }

    const routeUser = async (userId: string) => {
      if (!mounted) return;
      localStorage.removeItem("auth-redirect-pending");
      const { data: profile } = await supabase
        .from("profiles")
        .select("submitted")
        .eq("id", userId)
        .maybeSingle();

      if (!mounted) return;
      const destination = profile?.submitted ? "/passport/passport" : "/passport/onboarding";
      toast.success("Signed in successfully!");
      nav({ to: destination, replace: true });
    };

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error: exchangeError }) => {
        if (!mounted) return;
        if (exchangeError) {
          navigateToError(exchangeError.message);
        } else if (data.session) {
          logUserActivity({ action: "User Login", loginMethod: "email_callback" });
          routeUser(data.session.user.id);
        }
      });
      return;
    }

    // Check if session is already active or restored from hash
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session) {
        routeUser(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "SIGNED_IN" && session) {
        routeUser(session.user.id);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [nav]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="rounded-3xl border border-ink/10 bg-card p-8 text-center shadow-card">
        <p className="font-display text-xl">{message}</p>
        <p className="mt-2 text-sm text-ink/60">Please wait while your sign-in is completed.</p>
      </div>
    </div>
  );
}
