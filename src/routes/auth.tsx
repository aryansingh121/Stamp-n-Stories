import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppHeader } from "@/components/AppHeader";
import { toast } from "sonner";
import { logUserActivity } from "@/lib/logger";
import { Plane } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Stamp & Stories" },
      { name: "description", content: "Sign in or create your community passport." },
    ],
  }),
  component: AuthPage,
});

function getAppOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  const configuredOrigin =
    import.meta.env.VITE_SITE_URL ||
    import.meta.env.VITE_PUBLIC_SITE_URL ||
    import.meta.env.VITE_APP_URL;

  return configuredOrigin?.replace(/\/$/, "") || "https://stampnstories.com";
}

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // AuthBootstrap handles logged-in users who land on /auth
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        localStorage.setItem("auth-redirect-pending", Date.now().toString());
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${getAppOrigin()}/auth/callback`,
            data: { full_name: name },
          },
        });
        if (error) {
          logUserActivity({ action: "Failed Signup Attempt", metadata: { error: error.message } });
          localStorage.removeItem("auth-redirect-pending");
          throw error;
        }
        logUserActivity({ action: "Account Created", loginMethod: "email" });
        toast.success("Welcome! Let's build your passport.");
        // Routing is handled by AuthBootstrap
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          logUserActivity({
            action: "Failed Login Attempt",
            loginMethod: "email",
            metadata: { error: error.message },
          });
          localStorage.removeItem("auth-redirect-pending");
          throw error;
        }
        localStorage.setItem("auth-redirect-pending", Date.now().toString());
        logUserActivity({ action: "User Login", loginMethod: "email" });
        toast.success("Welcome back!");
        // Routing is handled by AuthBootstrap
      }
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("Auth error:", err);
      }
      let errorMessage = "Something went wrong. Please try again.";
      if (err instanceof Error && err.message) {
        errorMessage = typeof err.message === "string" ? err.message : JSON.stringify(err.message);
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage =
          typeof (err as any).message === "string"
            ? (err as any).message
            : JSON.stringify((err as any).message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      toast.error(errorMessage);
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      localStorage.setItem("auth-redirect-pending", Date.now().toString());
      console.log(
        "Before OAuth: auth-redirect-pending =",
        localStorage.getItem("auth-redirect-pending")
      );
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${getAppOrigin()}/auth/callback`,
        },
      });

      if (error) {
        logUserActivity({
          action: "Failed Login Attempt",
          loginMethod: "google",
          metadata: { error: error.message },
        });
        localStorage.removeItem("auth-redirect-pending");
        throw error;
      }
      if (data?.url) {
        window.location.assign(data.url);
        return;
      }

      // Implicit fallback (handled globally by AuthBootstrap)
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        logUserActivity({ action: "Google Login", loginMethod: "google" });
      }
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("Google Auth error:", err);
      }
      let errorMessage = "Something went wrong. Please try again.";
      if (err instanceof Error && err.message) {
        errorMessage = typeof err.message === "string" ? err.message : JSON.stringify(err.message);
      } else if (typeof err === "object" && err !== null && "message" in err) {
        errorMessage =
          typeof (err as any).message === "string"
            ? (err as any).message
            : JSON.stringify((err as any).message);
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      toast.error(errorMessage);
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-md px-4 py-10">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-coral text-primary-foreground">
            <Plane className="h-5 w-5" />
          </div>
          <h1 className="mt-4 font-display text-3xl">
            {mode === "signup" ? "Create your passport" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            {mode === "signup"
              ? "Join the community in 30 seconds."
              : "Sign in to access your passport."}
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-ink/10 bg-card p-6 shadow-card">
          <Button
            type="button"
            onClick={google}
            disabled={busy}
            variant="outline"
            className="w-full rounded-full border-ink/30 h-11"
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>
            Continue with Google
          </Button>
          <div className="my-4 flex items-center gap-3 text-xs text-ink/40">
            <div className="h-px flex-1 bg-ink/10" /> or email{" "}
            <div className="h-px flex-1 bg-ink/10" />
          </div>
          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-ink text-paper hover:bg-coral h-11"
            >
              {busy ? "Just a sec…" : mode === "signup" ? "Create my passport" : "Sign in"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {mode === "signup" ? (
              <button
                type="button"
                className="text-ink/60 hover:text-coral"
                onClick={() => setMode("signin")}
              >
                Already have a passport? <span className="font-medium underline">Sign in</span>
              </button>
            ) : (
              <button
                type="button"
                className="text-ink/60 hover:text-coral"
                onClick={() => setMode("signup")}
              >
                New here? <span className="font-medium underline">Create a passport</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
