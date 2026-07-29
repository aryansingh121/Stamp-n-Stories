import { createFileRoute } from '@tanstack/react-router';
import { GoaSusegadPage } from '@/landing/pages/events/goa-susegad';

export const Route = createFileRoute('/landing/events')({
  component: GoaSusegadPage,
});
