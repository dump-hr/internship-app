import { Path } from '@constants/paths';
import { HomePage } from '@pages/HomePage';
import { Switch, Route } from 'wouter';
import { ProtectedRoutes } from './ProtectedRoutes';
import {
  ApplicationFormPage,
  ScheduleInterviewPage,
  StatusPage,
  TestPage,
  TestChoosePage,
  ScheduleTestPage,
  NotFoundPage,
  LoginPage,
} from './pages';

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
      <Route path={Path.Login} component={LoginPage} />

      <ProtectedRoutes />

      <Route path={Path.CatchAll} component={NotFoundPage} />
    </Switch>
  );
};
