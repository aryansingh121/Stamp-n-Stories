import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type AuditRow = Database["public"]["Tables"]["admin_audit_logs"]["Row"] & { admin?: { full_name: string | null } | null, target?: { full_name: string | null } | null };

export const Route = createFileRoute("/passport/_authenticated/admin_/audit")({
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
  component: AuditLogsPage,
});

function AuditLogsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-audit-logs", page, search],
    queryFn: async () => {
      let q = supabase
        .from("admin_audit_logs")
        .select(
          `
          *,
          admin:profiles!admin_audit_logs_admin_user_id_fkey(full_name),
          target:profiles!admin_audit_logs_target_user_id_fkey(full_name)
        `,
          { count: "exact" },
        )
        .order("created_at", { ascending: false })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (search) {
        q = q.or(`action.ilike.%${search}%,description.ilike.%${search}%`);
      }

      const { data: logs, count, error } = await q;
      if (error) throw error;
      return { logs: logs || [], count: count || 0 };
    },
  });

  const exportCsv = async () => {
    try {
      toast.info("Generating CSV...");
      const { data: allLogs, error } = await supabase
        .from("admin_audit_logs")
        .select(
          `*, admin:profiles!admin_audit_logs_admin_user_id_fkey(full_name), target:profiles!admin_audit_logs_target_user_id_fkey(full_name)`,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!allLogs?.length) return toast.info("No logs to export");

      const csvRows = ["ID,Time,Admin,Target,Action,Result,Description"];
      for (const log of (allLogs || []) as AuditRow[]) {
        const adminName = log.admin?.full_name || log.admin_user_id;
        const targetName = log.target?.full_name || log.target_user_id || "";
        const row = [
          log.id,
          new Date(log.created_at).toLocaleString(),
          `"${adminName}"`,
          `"${targetName}"`,
          `"${log.action}"`,
          log.result,
          `"${(log.description || "").replace(/"/g, '""')}"`,
        ];
        csvRows.push(row.join(","));
      }

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit_logs_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      toast.success("Exported successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to export");
    }
  };

  const logs = (data?.logs || []) as AuditRow[];
  const total = data?.count || 0;
  const maxPage = Math.max(0, Math.ceil(total / pageSize) - 1);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-coral" />
            <h1 className="font-display text-3xl">Admin Audit Logs</h1>
          </div>
          <Button variant="outline" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
            <Input
              className="pl-9 bg-card"
              placeholder="Search action or description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-card overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-ink/60">
              <tr>
                <th className="p-3 font-medium">Time</th>
                <th className="p-3 font-medium">Admin</th>
                <th className="p-3 font-medium">Action</th>
                <th className="p-3 font-medium">Target User</th>
                <th className="p-3 font-medium">Result</th>
                <th className="p-3 font-medium max-w-[300px]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-ink/50">
                    Loading...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-ink/50">
                    No logs found.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/50">
                    <td className="p-3 whitespace-nowrap text-ink/70">
                      {new Date(log.created_at).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-3 font-medium">
                      {log.admin?.full_name || log.admin_user_id.substring(0, 8)}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center rounded-md bg-sun/30 px-2 py-1 text-xs font-medium text-ink ring-1 ring-inset ring-sun/50">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 text-ink/70">
                      {log.target?.full_name ||
                        log.target_user_id?.substring(0, 8) ||
                        "—"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-xs font-medium ${log.result === "error" ? "text-destructive" : "text-green-600"}`}
                      >
                        {log.result}
                      </span>
                    </td>
                    <td
                      className="p-3 text-ink/80 max-w-[300px] truncate"
                      title={log.description || ""}
                    >
                      {log.description || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-ink/60">
          <div>
            Showing {Math.min(total, page * pageSize + 1)} to{" "}
            {Math.min(total, (page + 1) * pageSize)} of {total}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= maxPage}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
