import { AccountInfo, PublicClientApplication } from '@azure/msal-browser';
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
import { useEffect, useState } from 'react';
import { msalConfig } from 'src/configs/azure.config';
import { Route } from 'wouter';

export const ProtectedRoutes = () => {
  const [isReady, setIsReady] = useState(false);
  const [account, setAccount] = useState<AccountInfo>();

  useEffect(() => {
    const msalInstance = new PublicClientApplication(msalConfig);
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        const response = await msalInstance.handleRedirectPromise();
        const account = response?.account ?? msalInstance.getAllAccounts()[0];

        if (!account) {
          await msalInstance.loginRedirect({ scopes: ['openid', 'profile'] });
        } else {
          setAccount(account);
          setIsReady(true);
        }
      } catch (error) {
        console.error('MSAL initialization error:', error);
      }
    };

    initializeMsal();
  }, []);

  if (!isReady) return <div>Loading...</div>;
  if (!account) return <div>Authentication Failed</div>;

  return (
    <>
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
    </>
  );
};
