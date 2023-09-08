import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import { ApplicationFormPage } from './pages/ApplicationFormPage/ApplicationFormPage';
import { HomePage } from './pages/HomePage';
import InterviewDateTimePage from './pages/InterviewDateTimePage';
import InterviewPage from './pages/InterviewPage';
import { NotFoundPage } from './pages/NotFoundPage';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path={Path.Home} component={HomePage} />
            <Route
              path={Path.ApplicationForm}
              component={ApplicationFormPage}
            />
            <Route path={Path.Interview} component={InterviewPage} />
            <Route
              path={Path.InterviewDateTime}
              component={InterviewDateTimePage}
            />
            <Route path={Path.CatchAll} component={NotFoundPage} />
          </Switch>
          <Toaster />
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
};
