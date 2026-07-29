import { createFileRoute, Outlet } from '@tanstack/react-router';
import { TooltipProvider } from '@/landing/components/ui/tooltip';
import { Toaster } from '@/landing/components/ui/toaster';
import '@/landing/index.css';

export const Route = createFileRoute('/_site')({
  component: LandingLayout,
});

function LandingLayout() {
  return (
    <TooltipProvider>
      <Outlet />
      <Toaster />
    </TooltipProvider>
  );
}
