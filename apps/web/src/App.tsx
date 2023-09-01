import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Path } from './constants/paths';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CounterPage } from './pages/CounterPage';
import { ApplicationFormPage } from './pages/ApplicationFormPage/ApplicationFormPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.Count} component={CounterPage} />
          <Route
            path={Path.ApplicationFormPage}
            component={ApplicationFormPage}
          />
          <Route path={Path.CatchAll} component={NotFoundPage} />
        </Switch>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};
