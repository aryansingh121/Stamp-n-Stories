import { createFileRoute } from '@tanstack/react-router';
import { RulesPage } from '@/landing/pages/rules';

export const Route = createFileRoute('/landing/rules')({
  component: RulesPage,
});
