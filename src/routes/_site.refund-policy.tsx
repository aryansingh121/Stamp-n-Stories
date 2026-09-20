import { createFileRoute } from "@tanstack/react-router";
import { RefundPolicyPage } from "@/landing/pages/refund-policy";

export const Route = createFileRoute("/_site/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Stamp & Stories" },
      {
        name: "description",
        content:
          "Official Stamp & Stories Refund and Cancellation Policy for curated experiences.",
      },
    ],
  }),
  component: RefundPolicyPage,
});
