import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export function AuthBootstrap() {
  const router = useRouter();

  useEffect(() => {
    const rawPending = localStorage.getItem("auth-redirect-pending");
    console.log("After OAuth:\nauth-redirect-pending =", rawPending);
    
    let mounted = true;

    const handleSession = async (session: any) => {
      if (!session) return;
      
      const pendingTimestamp = localStorage.getItem("auth-redirect-pending");
      let isPending = false;
      
      if (pendingTimestamp) {
        const age = Date.now() - parseInt(pendingTimestamp, 10);
        if (age > 10 * 60 * 1000) { // 10 minutes in milliseconds
          localStorage.removeItem("auth-redirect-pending");
          console.log("auth-redirect-pending was stale and removed.");
        } else {
          isPending = true;
        }
      }

      const isAuthRoute = window.location.pathname.startsWith("/auth");

      // Only navigate if there's a pending login redirect OR the user is improperly on an auth page
      if (isPending || isAuthRoute) {
        if (isPending) {
          localStorage.removeItem("auth-redirect-pending");
          console.log("After redirect:\nauth-redirect-pending removed");
        }

        // Clean up hash fragment if implicit flow fell back to root
        if (window.location.pathname === "/" && window.location.hash.includes("access_token")) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("submitted")
          .eq("id", session.user.id)
          .maybeSingle();

        if (!mounted) return;

        const destination = profile?.submitted ? "/passport/passport" : "/passport/onboarding";

        // Prevent redirect loops
        if (window.location.pathname === destination) {
          return;
        }

        router.navigate({ to: destination, replace: true }).catch(() => {
          window.location.assign(destination);
        });
      }
    };

    // Listen for incoming sign-ins (e.g. from Implicit Flow, OAuth, or local signInWithPassword)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        handleSession(session);
      }
    });

    // Check session on mount (catches explicit refreshes or direct navigations)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleSession(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return null;
}
