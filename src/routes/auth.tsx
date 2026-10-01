import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppHeader } from "@/components/AppHeader";
import { toast } from "sonner";
import { logUserActivity } from "@/lib/logger";
import { Plane, AlertCircle, Mail, ArrowRight, Loader2 } from "lucide-react";

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

function formatAuthError(err: unknown, mode: "signup" | "signin"): string {
  let message = "";
  let status: number | undefined;

  if (err instanceof Error) {
    message = err.message;
    if ("status" in err && typeof (err as { status: unknown }).status === "number") {
      status = (err as { status: number }).status;
    }
  } else if (typeof err === "object" && err !== null) {
    if ("message" in err) {
      message = String((err as { message: unknown }).message);
    }
    if ("status" in err && typeof (err as { status: unknown }).status === "number") {
      status = (err as { status: number }).status;
    }
  } else if (typeof err === "string") {
    message = err;
  }

  const lower = message.toLowerCase();

  // Rate limiting (HTTP 429 or matching keywords)
  if (
    status === 429 ||
    lower.includes("rate limit") ||
    lower.includes("too many requests") ||
    lower.includes("over_email_send_rate_limit")
  ) {
    return mode === "signup"
      ? "Too many signup attempts. Please wait a moment and try again."
      : "Too many sign-in attempts. Please wait a moment and try again.";
  }

  // Email already in use
  if (
    lower.includes("already registered") ||
    lower.includes("already in use") ||
    lower.includes("user already exists")
  ) {
    return "An account with this email already exists. Please sign in instead.";
  }

  // Invalid login credentials
  if (
    lower.includes("invalid login credentials") ||
    lower.includes("invalid credentials")
  ) {
    return "Invalid email or password. Please check your credentials.";
  }

  // Unconfirmed email
  if (lower.includes("email not confirmed")) {
    return "Your email is not verified yet. Please check your inbox for the confirmation link.";
  }

  // Weak password
  if (lower.includes("password should be at least") || lower.includes("weak password")) {
    return "Password is too weak. Please use at least 6 characters.";
  }

  // Invalid email format from server
  if (lower.includes("invalid email") || lower.includes("email address is invalid")) {
    return "Please enter a valid email address.";
  }

  // Network errors
  if (
    lower.includes("failed to fetch") ||
    lower.includes("network") ||
    lower.includes("networkerror") ||
    lower.includes("timeout") ||
    lower.includes("abort")
  ) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  return message || "Something went wrong. Please try again.";
}

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState<string | null>(null);

  // Synchronous locks to completely prevent double-click / rapid Enter submission
  const isSubmittingRef = useRef(false);
  const isGoogleSubmittingRef = useRef(false);

  // If user is already authenticated, redirect to their passport route
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && mounted) {
        supabase
          .from("profiles")
          .select("submitted")
          .eq("id", session.user.id)
          .maybeSingle()
          .then(({ data: profile }) => {
            if (!mounted) return;
            const destination = profile?.submitted ? "/passport/passport" : "/passport/onboarding";
            nav({ to: destination, replace: true });
          });
      }
    });

    return () => {
      mounted = false;
    };
  }, [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    // Guard against duplicate invocations from double-click or rapid enter keypress
    if (isSubmittingRef.current || busy) {
      return;
    }

    setErrorMsg(null);
    setEmailConfirmationRequired(null);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedEmail) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (mode === "signup" && !trimmedName) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    // Synchronously lock and set state immediately
    isSubmittingRef.current = true;
    setBusy(true);

    try {
      if (mode === "signup") {
        localStorage.setItem("auth-redirect-pending", Date.now().toString());

        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            emailRedirectTo: `${getAppOrigin()}/auth/callback`,
            data: { full_name: trimmedName },
          },
        });

        if (error) {
          logUserActivity({ action: "Failed Signup Attempt", metadata: { error: error.message } });
          localStorage.removeItem("auth-redirect-pending");

          const friendlyError = formatAuthError(error, "signup");
          setErrorMsg(friendlyError);
          toast.error(friendlyError);
          return;
        }

        // In Supabase with email confirmation enabled:
        // If email already exists and enumeration protection is enabled,
        // identities is an empty array [] without an error.
        if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
          localStorage.removeItem("auth-redirect-pending");
          const msg = "An account with this email already exists. Please sign in instead.";
          setErrorMsg(msg);
          toast.error(msg);
          return;
        }

        logUserActivity({ action: "Account Created", loginMethod: "email" });

        if (data?.session) {
          // Direct session established (e.g. auto-confirm or confirmation disabled)
          toast.success("Welcome! Let's build your passport.");

          // Ensure profile has full_name
          try {
            await supabase
              .from("profiles")
              .update({ full_name: trimmedName })
              .eq("id", data.session.user.id);
          } catch {
            // Profile trigger already sets full_name from metadata
          }

          const { data: profile } = await supabase
            .from("profiles")
            .select("submitted")
            .eq("id", data.session.user.id)
            .maybeSingle();

          const destination = profile?.submitted ? "/passport/passport" : "/passport/onboarding";
          await nav({ to: destination });
        } else {
          // Supabase email confirmation is enabled: user created but session is null
          localStorage.removeItem("auth-redirect-pending");
          setEmailConfirmationRequired(trimmedEmail);
          toast.success("Passport created! Please verify your email to continue.");
        }
      } else {
        // Sign-in mode
        localStorage.setItem("auth-redirect-pending", Date.now().toString());

        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (error) {
          logUserActivity({
            action: "Failed Login Attempt",
            loginMethod: "email",
            metadata: { error: error.message },
          });
          localStorage.removeItem("auth-redirect-pending");

          const friendlyError = formatAuthError(error, "signin");
          setErrorMsg(friendlyError);
          toast.error(friendlyError);
          return;
        }

        logUserActivity({ action: "User Login", loginMethod: "email" });
        toast.success("Welcome back!");

        if (data?.session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("submitted")
            .eq("id", data.session.user.id)
            .maybeSingle();

          const destination = profile?.submitted ? "/passport/passport" : "/passport/onboarding";
          await nav({ to: destination });
        }
      }
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("Auth error:", err);
      }
      const errorMessage = formatAuthError(err, mode);
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      isSubmittingRef.current = false;
      setBusy(false);
    }
  }

  async function google() {
    if (isGoogleSubmittingRef.current || isSubmittingRef.current || busy) {
      return;
    }
    isGoogleSubmittingRef.current = true;
    setBusy(true);
    setErrorMsg(null);
    setEmailConfirmationRequired(null);

    try {
      localStorage.setItem("auth-redirect-pending", Date.now().toString());

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
        const formatted = formatAuthError(error, mode);
        setErrorMsg(formatted);
        toast.error(formatted);
        return;
      }

      if (data?.url) {
        window.location.assign(data.url);
        return;
      }

      // Implicit fallback
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        logUserActivity({ action: "Google Login", loginMethod: "google" });
        const { data: profile } = await supabase
          .from("profiles")
          .select("submitted")
          .eq("id", session.user.id)
          .maybeSingle();

        const destination = profile?.submitted ? "/passport/passport" : "/passport/onboarding";
        await nav({ to: destination });
      }
    } catch (err: unknown) {
      if (import.meta.env.DEV) {
        console.error("Google Auth error:", err);
      }
      const errorMessage = formatAuthError(err, mode);
      setErrorMsg(errorMessage);
      toast.error(errorMessage);
    } finally {
      isGoogleSubmittingRef.current = false;
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
          {emailConfirmationRequired ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-coral/15 text-coral">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display text-xl text-ink">Check your email</h2>
                <p className="text-xs text-ink/70 max-w-xs mx-auto leading-relaxed">
                  We sent a confirmation link to <strong className="text-ink">{emailConfirmationRequired}</strong>. Click the link in your email to activate your passport and continue to onboarding.
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEmailConfirmationRequired(null);
                    setMode("signin");
                  }}
                  className="w-full rounded-full border-ink/30 h-11 text-xs"
                >
                  Already confirmed? Sign in
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setEmailConfirmationRequired(null);
                    setErrorMsg(null);
                  }}
                  className="text-xs text-ink/60 hover:text-coral transition-colors py-1"
                >
                  ← Back to signup form
                </button>
              </div>
            </div>
          ) : (
            <>
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

              {errorMsg && (
                <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="leading-relaxed">{errorMsg}</p>
                    {(errorMsg.toLowerCase().includes("already registered") ||
                      errorMsg.toLowerCase().includes("already exists")) && (
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMsg(null);
                          setMode("signin");
                        }}
                        className="mt-1.5 font-bold underline hover:opacity-80 inline-flex items-center gap-1 text-coral"
                      >
                        Sign in instead <ArrowRight className="h-3 w-3 inline" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={submit} className="space-y-3">
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      disabled={busy}
                      required
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    disabled={busy}
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
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    disabled={busy}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-ink text-paper hover:bg-coral h-11 transition-colors"
                >
                  {busy ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Just a sec…</span>
                    </span>
                  ) : mode === "signup" ? (
                    "Create my passport"
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                {mode === "signup" ? (
                  <button
                    type="button"
                    className="text-ink/60 hover:text-coral transition-colors"
                    onClick={() => {
                      setErrorMsg(null);
                      setMode("signin");
                    }}
                    disabled={busy}
                  >
                    Already have a passport? <span className="font-medium underline">Sign in</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-ink/60 hover:text-coral transition-colors"
                    onClick={() => {
                      setErrorMsg(null);
                      setMode("signup");
                    }}
                    disabled={busy}
                  >
                    New here? <span className="font-medium underline">Create a passport</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
