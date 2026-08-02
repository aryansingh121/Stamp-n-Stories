import { supabase } from "@/integrations/supabase/client";

// Simple UA parser to avoid adding heavy dependencies
function parseUserAgent(ua: string) {
  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("SamsungBrowser")) browser = "Samsung Internet";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  else if (ua.includes("Edge") || ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";

  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("X11") || ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("like Mac OS X")) os = "iOS";

  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) device = "Mobile";
  if (/Tablet|iPad/i.test(ua)) device = "Tablet";

  return { browser, os, device };
}

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const parsed = parseUserAgent(ua);
  return {
    user_agent: ua,
    browser: parsed.browser,
    os: parsed.os,
    device_type: parsed.device,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
  };
}

export async function logAdminAction(params: {
  action: string;
  description?: string;
  targetUserId?: string;
  metadata?: Record<string, string | number | boolean | null>;
  result?: "success" | "error";
  errorMessage?: string;
}) {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return; // Must be logged in

    const { error } = await supabase.from("admin_audit_logs").insert({
      admin_user_id: session.user.id,
      target_user_id: params.targetUserId || null,
      action: params.action,
      description: params.description,
      metadata: params.metadata || {},
      result: params.result || "success",
      error_message: params.errorMessage || null,
      session_id: session.access_token.substring(0, 32), // Rough session identifier
    });

    if (error && import.meta.env.DEV) {
      console.error("Failed to write admin audit log:", error);
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error("Audit log error:", err);
    }
  }
}

export async function logUserActivity(params: {
  action: string;
  description?: string;
  metadata?: Record<string, string | number | boolean | null>;
  loginMethod?: string;
}) {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    const deviceInfo = getDeviceInfo();

    const { error } = await supabase.from("user_activity_logs").insert({
      user_id: session.user.id,
      action: params.action,
      description: params.description,
      metadata: params.metadata || {},
      login_method: params.loginMethod || null,
      session_id: session.access_token.substring(0, 32),
      ...deviceInfo,
    });

    if (error && import.meta.env.DEV) {
      console.error("Failed to write user activity log:", error);
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error("Activity log error:", err);
    }
  }
}
