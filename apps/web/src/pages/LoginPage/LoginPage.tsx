import { InteractionType } from '@azure/msal-browser';
import LoginForm from '../../components/LoginForm';
import classes from './index.module.css';
import { useMsalAuthentication } from '@azure/msal-react';
import { useAccount } from '../../hooks/useAccount';

const LoginPage = () => {
  const x = useAccount();
  console.log(x);
  useMsalAuthentication(InteractionType.Redirect);

  return (
    <div className={classes.loginFormWrapper}>
      <h1 className={classes.loginFormTitle}>Admin login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
