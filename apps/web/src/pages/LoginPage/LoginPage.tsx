import LoginForm from '../../components/LoginForm';
import classes from './index.module.css';

export const LoginPage = () => {
  return (
    <div className={classes.loginFormWrapper}>
      <h1 className={classes.loginFormTitle}>Admin login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
