import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/landing/pages/home";

export const Route = createFileRoute("/_site/")({
  component: HomePage,
});
