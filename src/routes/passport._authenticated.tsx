import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/passport/_authenticated")({
  ssr: false,

  beforeLoad: async () => {
    // If running on the server during SSR, skip the redirect.
    // The client will validate the session instantaneously upon hydration.
    if (typeof window === "undefined") {
      return {};
    }

    // Use getSession() instead of getUser() to avoid network round-trips
    // and rely on synchronous localStorage state for client-side routing.
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      throw redirect({ to: "/auth" });
    }

    return { user: data.session.user };
  },

  component: () => <Outlet />,
});
