import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import { HomePage } from './pages/HomePage';
import InterviewPage from './pages/InterviewPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <>
      <Switch>
        <Route path={Path.Home} component={HomePage} />
        <Route path={Path.Interview} component={InterviewPage} />
        <Route path={Path.CatchAll} component={NotFoundPage} />
      </Switch>
      <Toaster />
    </>
  );
};
