import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  Stamp as StampIcon,
  ShieldCheck,
  Search,
  FileCheck2,
} from "lucide-react";
import { signedPhotoUrl, signedIdProofUrl } from "@/lib/photo";
import { logAdminAction } from "@/lib/logger";

export const Route = createFileRoute("/passport/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) throw redirect({ to: "/auth" });
    const userId = session.user.id;

    const role = await context.queryClient.fetchQuery({
      queryKey: ["user-role", userId],
      queryFn: async () => {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .maybeSingle();
        return data?.role || null;
      },
      staleTime: 1000 * 60 * 5,
    });

    if (role !== "admin") throw redirect({ to: "/passport" });
  },
  pendingComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-ink/50">Checking access…</p>
    </div>
  ),
  component: AdminPage,
});

function AdminPage() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [stampOpen, setStampOpen] = useState<null | { id: string; name: string }>(null);
  const [stampEvent, setStampEvent] = useState("");
  const [stampEmoji, setStampEmoji] = useState("✦");

  useEffect(() => {
    logAdminAction({
      action: "Login to Admin Dashboard",
      description: "Admin accessed the dashboard",
    });
  }, []);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayIso = today.toISOString();

      const [
        { count: totalUsers },
        { count: totalPassports },
        { count: pendingPassports },
        { count: approvedPassports },
        { count: rejectedPassports },
        { count: loginsToday },
        { count: registrationsToday },
        { count: adminActionsToday },
        { data: latestAuditLogs },
        { data: latestUserActivities },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("submitted", true),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending")
          .eq("submitted", true),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("status", "approved"),
        supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("status", "rejected"),
        supabase
          .from("user_activity_logs")
          .select("*", { count: "exact", head: true })
          .eq("action", "User Login")
          .gte("created_at", todayIso),
        supabase
          .from("user_activity_logs")
          .select("*", { count: "exact", head: true })
          .eq("action", "User Signup")
          .gte("created_at", todayIso),
        supabase
          .from("admin_audit_logs")
          .select("*", { count: "exact", head: true })
          .gte("created_at", todayIso),
        supabase
          .from("admin_audit_logs")
          .select("*, admin:profiles!admin_audit_logs_admin_user_id_fkey(full_name)")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("user_activity_logs")
          .select("*, user:profiles!user_activity_logs_user_id_fkey(full_name)")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      return {
        totalUsers: totalUsers || 0,
        totalPassports: totalPassports || 0,
        pendingPassports: pendingPassports || 0,
        approvedPassports: approvedPassports || 0,
        rejectedPassports: rejectedPassports || 0,
        loginsToday: loginsToday || 0,
        registrationsToday: registrationsToday || 0,
        adminActionsToday: adminActionsToday || 0,
        latestAuditLogs: latestAuditLogs || [],
        latestUserActivities: latestUserActivities || [],
      };
    },
  });

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const list = (profiles || []).filter((p) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return [p.full_name, p.city, p.traveller_code, p.age?.toString(), ...(p.interests || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(s);
  });

  async function setStatus(id: string, status: "approved" | "rejected" | "pending") {
    const { error } = await supabase.from("profiles").update({ status }).eq("id", id);
    if (error) {
      logAdminAction({
        action: `Change Passport Status`,
        targetUserId: id,
        metadata: { status },
        result: "error",
        errorMessage: error.message,
      });
      return toast.error(error.message);
    }
    logAdminAction({
      action: `Change Passport Status`,
      description: `Marked passport as ${status}`,
      targetUserId: id,
      metadata: { status },
    });
    toast.success(`Marked ${status}`);
    qc.invalidateQueries({ queryKey: ["admin-profiles"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
  }

  async function addStamp() {
    if (!stampOpen || !stampEvent.trim()) return;
    const profile = profiles?.find((p) => p.id === stampOpen.id);
    if (!profile) return;
    const stamps = [
      ...((profile.stamps as Array<{ event: string; emoji: string; date: string }>) || []),
      {
        event: stampEvent.trim(),
        emoji: stampEmoji,
        date: new Date().toISOString(),
      },
    ];
    const { error } = await supabase
      .from("profiles")
      .update({
        stamps,
        points: (profile.points || 0) + 10,
      })
      .eq("id", stampOpen.id);
    if (error) {
      logAdminAction({
        action: "Edit User Information",
        description: "Failed to add stamp",
        targetUserId: stampOpen.id,
        result: "error",
        errorMessage: error.message,
      });
      return toast.error(error.message);
    }
    logAdminAction({
      action: "Edit User Information",
      description: `Added stamp: ${stampEvent}`,
      targetUserId: stampOpen.id,
      metadata: { stampEvent, stampEmoji },
    });
    toast.success("Stamp added");
    setStampOpen(null);
    setStampEvent("");
    qc.invalidateQueries({ queryKey: ["admin-profiles"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="h-7 w-7 text-coral" />
          <h1 className="font-display text-3xl">Admin dashboard</h1>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Total Users" value={stats?.totalUsers} loading={statsLoading} />
            <StatCard
              title="Total Passports"
              value={stats?.totalPassports}
              loading={statsLoading}
            />
            <StatCard
              title="Pending Passports"
              value={stats?.pendingPassports}
              loading={statsLoading}
              className="border-sun bg-sun/10"
            />
            <StatCard
              title="Approved Passports"
              value={stats?.approvedPassports}
              loading={statsLoading}
              className="border-green-500/30 bg-green-500/10"
            />
            <StatCard
              title="Rejected Passports"
              value={stats?.rejectedPassports}
              loading={statsLoading}
              className="border-destructive/30 bg-destructive/10"
            />
            <StatCard title="Logins Today" value={stats?.loginsToday} loading={statsLoading} />
            <StatCard
              title="Signups Today"
              value={stats?.registrationsToday}
              loading={statsLoading}
            />
            <StatCard
              title="Admin Actions Today"
              value={stats?.adminActionsToday}
              loading={statsLoading}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-ink/10 rounded-2xl p-4 overflow-x-auto">
              <h3 className="font-medium text-sm text-ink/70 mb-3">Latest User Activity</h3>
              <table className="w-full text-xs text-left">
                <thead className="text-ink/50 bg-muted">
                  <tr>
                    <th className="p-2 rounded-l-md font-medium">User</th>
                    <th className="p-2 font-medium">Action</th>
                    <th className="p-2 rounded-r-md font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {statsLoading ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-ink/40">
                        Loading...
                      </td>
                    </tr>
                  ) : stats?.latestUserActivities?.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-ink/40">
                        No recent activity
                      </td>
                    </tr>
                  ) : (
                    stats?.latestUserActivities?.map(
                      (
                        l: import("@/integrations/supabase/types").Database["public"]["Tables"]["user_activity_logs"]["Row"] & {
                          user?: { full_name: string | null };
                        },
                      ) => (
                        <tr key={l.id} className="hover:bg-muted/50 transition-colors">
                          <td className="p-2 font-medium">
                            {(l.user as { full_name: string | null })?.full_name ||
                              l.user_id.substring(0, 8)}
                          </td>
                          <td className="p-2">{l.action}</td>
                          <td className="p-2 text-ink/50 whitespace-nowrap">
                            {new Date(l.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ),
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-card border border-ink/10 rounded-2xl p-4 overflow-x-auto">
              <h3 className="font-medium text-sm text-ink/70 mb-3">Latest Admin Audits</h3>
              <table className="w-full text-xs text-left">
                <thead className="text-ink/50 bg-muted">
                  <tr>
                    <th className="p-2 rounded-l-md font-medium">Admin</th>
                    <th className="p-2 font-medium">Action</th>
                    <th className="p-2 rounded-r-md font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {statsLoading ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-ink/40">
                        Loading...
                      </td>
                    </tr>
                  ) : stats?.latestAuditLogs?.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-ink/40">
                        No recent audits
                      </td>
                    </tr>
                  ) : (
                    stats?.latestAuditLogs?.map(
                      (
                        l: import("@/integrations/supabase/types").Database["public"]["Tables"]["admin_audit_logs"]["Row"] & {
                          admin?: { full_name: string | null };
                        },
                      ) => (
                        <tr key={l.id} className="hover:bg-muted/50 transition-colors">
                          <td className="p-2 font-medium">
                            {l.admin?.full_name || l.admin_user_id.substring(0, 8)}
                          </td>
                          <td className="p-2">{l.action}</td>
                          <td className="p-2 text-ink/50 whitespace-nowrap">
                            {new Date(l.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ),
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-12 mb-4">
          <h2 className="font-display text-2xl">Member Directory</h2>
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
            <Input
              className="pl-9 bg-card"
              placeholder="Search name, city, code, age, interest"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="text-sm text-ink/60">
            {profiles?.length || 0} total ·{" "}
            {profiles?.filter((p) => p.status === "pending" && p.submitted).length || 0} pending
          </div>
        </div>

        {isLoading ? (
          <p className="text-ink/50">Loading…</p>
        ) : (
          <div className="grid gap-3">
            {list.map((p) => (
              <ProfileRow
                key={p.id}
                p={p}
                onApprove={() => setStatus(p.id, "approved")}
                onReject={() => setStatus(p.id, "rejected")}
                onReset={() => setStatus(p.id, "pending")}
                onStamp={() => setStampOpen({ id: p.id, name: p.full_name || "Member" })}
              />
            ))}
            {!list.length && <p className="text-ink/50 text-sm">No profiles match.</p>}
          </div>
        )}
      </main>

      <Dialog open={!!stampOpen} onOpenChange={(o) => !o && setStampOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add stamp for {stampOpen?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Event name</Label>
              <Input
                value={stampEvent}
                onChange={(e) => setStampEvent(e.target.value)}
                placeholder="Goa Trip · BLR Meetup · House Party 04"
              />
            </div>
            <div>
              <Label>Emoji</Label>
              <Input
                value={stampEmoji}
                onChange={(e) => setStampEmoji(e.target.value)}
                maxLength={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStampOpen(null)}>
              Cancel
            </Button>
            <Button onClick={addStamp} className="bg-coral text-primary-foreground">
              Add stamp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProfileRow({
  p,
  onApprove,
  onReject,
  onReset,
  onStamp,
}: {
  p: import("@/integrations/supabase/types").Database["public"]["Tables"]["profiles"]["Row"];
  onApprove: () => void;
  onReject: () => void;
  onReset: () => void;
  onStamp: () => void;
}) {
  const [img, setImg] = useState<string | null>(null);
  useEffect(() => {
    if (p.photo_url) signedPhotoUrl(p.photo_url).then((u) => u && setImg(u));
  }, [p.photo_url]);

  const statusColor =
    p.status === "approved"
      ? "bg-green-600 text-white"
      : p.status === "rejected"
        ? "bg-destructive text-destructive-foreground"
        : "bg-sun text-ink";

  return (
    <div className="rounded-2xl border border-ink/10 bg-card p-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:items-center">
      <div className="h-14 w-12 shrink-0 rounded-md overflow-hidden bg-muted border border-ink/20">
        {img && <img src={img} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 sm:flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-display truncate">{p.full_name || "—"}</div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ${statusColor}`}
          >
            {p.status}
          </span>
          {!p.submitted && <span className="text-[10px] text-ink/40">(draft)</span>}
        </div>
        <div className="text-xs text-ink/60 truncate">
          {p.traveller_code} · {p.city || "—"} · age {p.age || "—"} ·{" "}
          {((p.stamps as Array<{ event: string; emoji: string; date: string }>) || []).length}{" "}
          stamps
        </div>
        {p.interests?.length > 0 && (
          <div className="text-[11px] text-ink/50 truncate">{p.interests.join(", ")}</div>
        )}
      </div>
      <div className="col-span-3 sm:col-span-1 flex flex-wrap gap-1.5 justify-end">
        {p.id_proof_url && (
          <Button
            size="sm"
            variant="outline"
            className="border-coral text-coral"
            onClick={async () => {
              const u = await signedIdProofUrl(p.id_proof_url);
              if (u) window.open(u, "_blank", "noopener,noreferrer");
              else toast.error("Could not load ID proof");
            }}
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            ID
          </Button>
        )}
        {p.status !== "approved" && (
          <Button
            size="sm"
            variant="outline"
            className="border-green-600 text-green-700"
            onClick={onApprove}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approve
          </Button>
        )}
        {p.status !== "rejected" && (
          <Button
            size="sm"
            variant="outline"
            className="border-destructive text-destructive"
            onClick={onReject}
          >
            <XCircle className="h-3.5 w-3.5" />
            Reject
          </Button>
        )}
        {p.status !== "pending" && (
          <Button size="sm" variant="ghost" onClick={onReset}>
            Reset
          </Button>
        )}
        <Button size="sm" variant="outline" onClick={onStamp}>
          <StampIcon className="h-3.5 w-3.5" />
          Stamp
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  loading,
  className = "",
}: {
  title: string;
  value?: number;
  loading?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-ink/10 bg-card p-4 flex flex-col justify-between gap-2 ${className}`}
    >
      <div className="text-xs font-medium text-ink/60">{title}</div>
      {loading ? (
        <div className="h-8 w-12 animate-pulse rounded bg-ink/10" />
      ) : (
        <div className="font-display text-3xl">{value?.toLocaleString() || "0"}</div>
      )}
    </div>
  );
}
