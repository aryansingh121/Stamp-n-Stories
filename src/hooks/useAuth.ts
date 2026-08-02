import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id;

  const { data: role } = useQuery({
    queryKey: ["user-role", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();
      return data?.role || null;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return {
    session,
    user: session?.user ?? null,
    loading,
    role,
    isAdmin: role === "admin",
  };
}

export function useIsAdmin(userId: string | null | undefined) {
  const { data: role, isFetched } = useQuery({
    queryKey: ["user-role", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();
      return data?.role || null;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  return { isAdmin: role === "admin", checked: !userId || isFetched };
}
