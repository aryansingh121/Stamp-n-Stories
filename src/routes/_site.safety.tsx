import { createFileRoute } from "@tanstack/react-router";
import { SafetyPage } from "@/landing/pages/safety";

export const Route = createFileRoute("/_site/safety")({
  component: SafetyPage,
});
