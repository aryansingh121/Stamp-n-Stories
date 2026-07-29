import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/landing/components/ui/toaster';
import { TooltipProvider } from '@/landing/components/ui/tooltip';
import NotFound from '@/landing/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { HomePage } from '@/landing/pages/home';
import { ApplyPage } from '@/landing/pages/apply';
import { PassportPage } from '@/landing/pages/passport';
import { HowItWorksPage } from '@/landing/pages/how-it-works';
import { ExperiencesPage } from '@/landing/pages/experiences';
import { BrandsPage } from '@/landing/pages/for-brands';
import { RulesPage } from '@/landing/pages/rules';
import { GoaSusegadPage } from '@/landing/pages/events/goa-susegad';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/apply" component={ApplyPage} />
      <Route path="/passport" component={PassportPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/experiences" component={ExperiencesPage} />
      <Route path="/for-brands" component={BrandsPage} />
      <Route path="/rules" component={RulesPage} />
      <Route path="/events/goa-susegad" component={GoaSusegadPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
