import { createFileRoute } from '@tanstack/react-router';
import { HowItWorksPage } from '@/landing/pages/how-it-works';

export const Route = createFileRoute('/_landing/about')({
  component: HowItWorksPage,
});
