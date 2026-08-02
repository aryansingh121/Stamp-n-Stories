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

    if (error) {
      navigateToError(errorDescription || error);
    }

    return () => {
      mounted = false;
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
