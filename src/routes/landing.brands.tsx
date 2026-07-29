import { createFileRoute } from '@tanstack/react-router';
import { BrandsPage } from '@/landing/pages/for-brands';

export const Route = createFileRoute('/landing/brands')({
  component: BrandsPage,
});
