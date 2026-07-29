import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const nav = useNavigate();
  const [message] = useState("Finishing sign-in...");

  useEffect(() => {
    let mounted = true;

    console.log("=== AUTH CALLBACK LOADED ===");
    console.log("Current URL:", window.location.href);

    let timer: ReturnType<typeof setTimeout>;
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    let hasNavigated = false;

    const navigateToNext = (next: string) => {
      if (!mounted || hasNavigated) return;
      hasNavigated = true;
      sessionStorage.removeItem("auth-next");
      toast.success("Signed in successfully");
      nav({ to: next as any });
    };

    const navigateToError = (msg: string) => {
      if (!mounted || hasNavigated) return;
      hasNavigated = true;
      sessionStorage.removeItem("auth-next");
      toast.error(msg);
      nav({ to: "/auth" });
    };

    const search = new URLSearchParams(window.location.search);
    const next = search.get("next") || sessionStorage.getItem("auth-next") || "/passport";
    const error = search.get("error");
    const errorDescription = search.get("error_description");

    if (error) {
      navigateToError(errorDescription || error);
      return;
    }

    // 1. Set up the listener first to avoid race conditions with getSession
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH EVENT:", event);
      console.log("SESSION:", session);
      if (event === "SIGNED_IN" || session) {
        if (timer) clearTimeout(timer);
        navigateToNext(next);
      }
    });
    authListener = data;

    // 2. Check if the session was already established before the listener was attached
    supabase.auth.getSession().then(({ data: { session }, error: sessionError }) => {
      if (sessionError) {
        navigateToError(sessionError.message);
        return;
      }
      if (session) {
        if (timer) clearTimeout(timer);
        navigateToNext(next);
      }
    }).catch(err => {
      navigateToError(err?.message || "Sign-in failed");
    });

    // 3. Set a safety timeout in case the implicit exchange hangs indefinitely
    timer = setTimeout(() => {
      navigateToError("Sign-in timed out. Please try again.");
    }, 5000);

    // 4. Synchronous cleanup following React best practices
    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
      if (authListener) authListener.subscription.unsubscribe();
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
