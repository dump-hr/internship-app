import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import { ApplicationFormPage } from './pages/ApplicationFormPage/ApplicationFormPage';
import { HomePage } from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import { NotFoundPage } from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.ApplicationForm} component={ApplicationFormPage} />
          <Route path={Path.Interview} component={InterviewPage} />
          <Route path={Path.Dashboard} component={DashboardPage} />
          <Route path={Path.CatchAll} component={NotFoundPage} />
        </Switch>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};
