import { createFileRoute } from '@tanstack/react-router';
import { ExperiencesPage } from '@/landing/pages/experiences';

export const Route = createFileRoute('/_landing/experiences')({
  component: ExperiencesPage,
});
