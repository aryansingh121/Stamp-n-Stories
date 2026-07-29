import { createFileRoute } from '@tanstack/react-router';
import { GoaSusegadPage } from '@/landing/pages/events/goa-susegad';

export const Route = createFileRoute('/_landing/events')({
  component: GoaSusegadPage,
});
