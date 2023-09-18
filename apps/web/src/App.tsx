import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import { ApplicationFormPage } from './pages/ApplicationFormPage/ApplicationFormPage';
import { HomePage } from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import LoginPage from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import StatusPage from './pages/StatusPage';
import CandidateInfoPage from './pages/CandidateInfoPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path={Path.Home} component={HomePage} />
          <Route path={Path.ApplicationForm} component={ApplicationFormPage} />
          <Route path={Path.Status} component={StatusPage} />
          <Route path={Path.Interview} component={InterviewPage} />
          <Route path={Path.Login} component={LoginPage} />
          <Route path={Path.Candidate} component={CandidateInfoPage} />
          <Route path={Path.CatchAll} component={NotFoundPage} />
        </Switch>
        <Toaster />
      </QueryClientProvider>
    </>
  );
};
