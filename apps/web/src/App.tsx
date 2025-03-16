import './App.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import { AdminInterviewPage } from './pages/AdminInterviewPage/AdminInterviewPage';
import AdminLogsPage from './pages/AdminLogsPage';
import { ApplicationFormPage } from './pages/ApplicationFormPage/ApplicationFormPage';
import CounterPage from './pages/CounterPage';
import DashboardPage from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import InternInfoPage from './pages/InternInfoPage';
import InterviewersPage from './pages/InterviewersPage';
import InterviewPage from './pages/InterviewPage';
import LoginPage from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import ScheduleInterviewPage from './pages/ScheduleInterviewPage';
import ScheduleTestPage from './pages/ScheduleTestPage';
import StatusPage from './pages/StatusPage';
import TestChoosePage from './pages/TestChoosePage';
import TestOverviewPage from './pages/TestOverviewPage';
import TestPage from './pages/TestPage';
import TestReviewPage from './pages/TestReviewPage';
import TestSchedulerPage from './pages/TestSchedulerPage';
import { InterviewBuilderPage } from './pages/InterviewBuilderPage';
import { InterviewQuestionStatsPage } from './pages/InterviewQuestionStatsPage';

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
            <Route path={Path.Status} component={StatusPage} />
            <Route path={Path.Interview} component={InterviewPage} />
            <Route path={Path.InterviewPicker} component={AdminInterviewPage} />
            <Route
              path={Path.InterviewBuilder}
              component={InterviewBuilderPage}
            />
            <Route
              path={Path.InterviewQuestionStats}
              component={InterviewQuestionStatsPage}
            />
            <Route
              path={Path.ScheduleInterview}
              component={ScheduleInterviewPage}
            />
            <Route path={Path.ScheduleTest} component={ScheduleTestPage} />
            <Route path={Path.Intern} component={InternInfoPage} />
            <Route path={Path.TestScheduler} component={TestSchedulerPage} />
            <Route path={Path.TestOverview} component={TestOverviewPage} />
            <Route path={Path.TestReview} component={TestReviewPage} />
            <Route path={Path.Test} component={TestPage} />
            <Route path={Path.TestChoose} component={TestChoosePage} />
            <Route path={Path.Dashboard} component={DashboardPage} />
            <Route path={Path.Login} component={LoginPage} />
            <Route path={Path.Interviewers} component={InterviewersPage} />
            <Route path={Path.AdminLogs} component={AdminLogsPage} />
            <Route path={Path.Counter} component={CounterPage} />
            <Route path={Path.CatchAll} component={NotFoundPage} />
          </Switch>
          <Toaster />
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
};
