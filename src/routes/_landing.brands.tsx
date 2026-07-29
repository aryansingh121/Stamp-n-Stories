import { createFileRoute } from '@tanstack/react-router';
import { BrandsPage } from '@/landing/pages/for-brands';

export const Route = createFileRoute('/_landing/brands')({
  component: BrandsPage,
});
