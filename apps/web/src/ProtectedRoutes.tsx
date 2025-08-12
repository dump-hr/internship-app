import { Route } from 'wouter';
import {
  InterviewPage,
  AdminInterviewPage,
  InternInfoPage,
  TestSchedulerPage,
  TestOverviewPage,
  TestReviewPage,
  DashboardPage,
  InterviewersPage,
  AdminLogsPage,
  CounterPage,
  InterviewBuilderPage,
  InterviewStatsPage,
} from '@pages/index';
import { msalConfig } from 'src/configs/azure.config';
import { PublicClientApplication, AccountInfo } from '@azure/msal-browser';
import { useState, useEffect } from 'react';
import { Path } from '@constants/paths';

export const ProtectedRoutes = () => {
  const [isReady, setIsReady] = useState(false);
  const [account, setAccount] = useState<AccountInfo>();
  const msalInstance = new PublicClientApplication(msalConfig);

  useEffect(() => {
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
