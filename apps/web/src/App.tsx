import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'wouter';

import { Path } from './constants/paths';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CounterPage } from './pages/CounterPage';
import { ApplicationFormPage } from './pages/ApplicationFormPage/ApplicationFormPage';

export const App = () => {
  return (
    <>
      <Switch>
        <Route path={Path.Home} component={HomePage} />
        <Route path={Path.Count} component={CounterPage} />
        <Route path={Path.ApplicationFormPage} component={ApplicationFormPage} /> 
        <Route path={Path.CatchAll} component={NotFoundPage} />
      </Switch>
      <Toaster />
    </>
  );
};
