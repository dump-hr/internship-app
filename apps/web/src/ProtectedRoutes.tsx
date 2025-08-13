import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { Path } from '@constants/paths';
import {
  AdminInterviewPage,
  AdminLogsPage,
  CounterPage,
  DashboardPage,
  InternInfoPage,
  InterviewBuilderPage,
  InterviewersPage,
  InterviewPage,
  InterviewStatsPage,
  TestOverviewPage,
  TestReviewPage,
  TestSchedulerPage,
} from '@pages/index';
import { Route } from 'wouter';

export const ProtectedRoutes = () => {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={{ scopes: ['openid', 'profile'] }}
      loadingComponent={() => <div>Loading...</div>}
      errorComponent={() => <div>Authentication Failed</div>}
    >
      <Route path={Path.Interview} component={InterviewPage} />
      <Route path={Path.InterviewPicker} component={AdminInterviewPage} />
      <Route path={Path.Intern} component={InternInfoPage} />
      <Route path={Path.TestScheduler} component={TestSchedulerPage} />
      <Route path={Path.TestOverview} component={TestOverviewPage} />
      <Route path={Path.TestReview} component={TestReviewPage} />
      <Route path={Path.Dashboard} component={DashboardPage} />
      <Route path={Path.Interviewers} component={InterviewersPage} />
      <Route path={Path.AdminLogs} component={AdminLogsPage} />
      <Route path={Path.Counter} component={CounterPage} />
      <Route path={Path.InterviewBuilder} component={InterviewBuilderPage} />
      <Route path={Path.InterviewStats} component={InterviewStatsPage} />
    </MsalAuthenticationTemplate>
  );
};
