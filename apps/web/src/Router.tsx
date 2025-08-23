import { Path } from '@constants/paths';
import { HomePage } from '@pages/HomePage';
import { Route, Switch } from 'wouter';

import {
  ApplicationFormPage,
  NotFoundPage,
  ScheduleInterviewPage,
  ScheduleTestPage,
  StatusPage,
  TestChoosePage,
  TestPage,
} from './pages';
import { ProtectedRoutes } from './ProtectedRoutes';

export const Router = () => {
  return (
    <Switch>
      <Route path={Path.Home} component={HomePage} />
      <Route path={Path.ApplicationForm} component={ApplicationFormPage} />
      <Route path={Path.ScheduleInterview} component={ScheduleInterviewPage} />
      <Route path={Path.ScheduleTest} component={ScheduleTestPage} />
      <Route path={Path.Status} component={StatusPage} />
      <Route path={Path.Test} component={TestPage} />
      <Route path={Path.TestChoose} component={TestChoosePage} />

      <ProtectedRoutes />

      <Route path={Path.CatchAll} component={NotFoundPage} />
    </Switch>
  );
};
