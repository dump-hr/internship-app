import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import {
  HomePage,
  ApplicationFormPage,
  AdminInterviewPage,
  InterviewBuilderPage,
  InterviewStatsPage,
  NotFoundPage,
  AdminLogsPage,
  CounterPage,
  DashboardPage,
  InternInfoPage,
  InterviewPage,
  InterviewersPage,
  LoginPage,
  ScheduleInterviewPage,
  ScheduleTestPage,
  StatusPage,
  TestChoosePage,
  TestOverviewPage,
  TestPage,
  TestReviewPage,
  TestSchedulerPage,
} from '@pages/index';

export const Router = () => {
  return (
    <Switch>
      <Route path={Path.Home} component={HomePage} />

      <Route path={Path.ApplicationForm} component={ApplicationFormPage} />

      <Route path={Path.Status} component={StatusPage} />

      <Route path={Path.Interview} component={InterviewPage} />
      <Route path={Path.InterviewPicker} component={AdminInterviewPage} />

      <Route path={Path.ScheduleInterview} component={ScheduleInterviewPage} />
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

      <Route path={Path.InterviewBuilder} component={InterviewBuilderPage} />
      <Route path={Path.InterviewStats} component={InterviewStatsPage} />

      <Route path={Path.CatchAll} component={NotFoundPage} />
    </Switch>
  );
};
