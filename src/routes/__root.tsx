import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "../lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-coral">404</h1>
        <h2 className="mt-4 text-xl font-display">Off the map</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page doesn't exist. Head back to base camp.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-coral"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  if (import.meta.env.DEV) {
    console.error(error);
  }
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-display">Something went sideways</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-coral px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-ink px-5 py-2 text-sm font-medium">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stamp & Stories — Community Passport" },
      {
        name: "description",
        content:
          "The digital passport for our travel community. Collect stamps, find your squad, share your story.",
      },
      { name: "google-site-verification", content: "" },
      { property: "og:url", content: "https://stampnstories.com" },
      { property: "og:title", content: "Stamp & Stories — Community Passport" },
      {
        property: "og:description",
        content: "Build your traveller passport. Collect stamps. Find your squad.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://stampnstories.com/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://stampnstories.com/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://stampnstories.com" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { AuthBootstrap } from "@/components/AuthBootstrap";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("==============================");
      console.log("[1. App Startup]");
      console.log("URL:", window.location.href);
      console.log("Hash:", window.location.hash);
      console.log("Pathname:", window.location.pathname);
      console.log("==============================");
    }

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("==============================");
      console.log("[3. onAuthStateChange - __root.tsx]");
      console.log("Event:", event);
      console.log("Pathname:", window.location.pathname);
      console.log("Hash:", window.location.hash);
      console.log("User ID:", session?.user?.id || "null");
      console.log("==============================");

      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setTimeout(() => {
        router.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      }, 50);
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      <Outlet />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
