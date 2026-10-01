import { createFileRoute } from "@tanstack/react-router";
import { VisionPage } from "@/landing/pages/vision";

export const Route = createFileRoute("/_site/vision")({
  component: VisionPage,
});
