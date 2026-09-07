import { createFileRoute } from "@tanstack/react-router";
import { ApplyPage } from "@/landing/pages/apply";

export const Route = createFileRoute("/_site/apply")({
  component: ApplyPage,
});
