import { InteractionType } from '@azure/msal-browser';
import LoginForm from '../../components/LoginForm';
import classes from './index.module.css';
import { useMsalAuthentication } from '@azure/msal-react';

const LoginPage = () => {
  console.log('a');
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <div className={classes.loginFormWrapper}>
      <h1 className={classes.loginFormTitle}>Admin loginqqq</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
