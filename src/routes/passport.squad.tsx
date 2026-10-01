import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/passport/squad")({
  beforeLoad: () => {
    throw redirect({ to: "/passport/discover" });
  },
  component: () => null,
});
