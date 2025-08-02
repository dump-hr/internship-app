import { Button } from '@mui/material';
import { Link } from 'wouter';

import DUMPLogo from '../../assets/dump-logo.png';
import { Path } from '@constants/index';
import { LayoutSpacing } from '@components/index';
import c from './LogoHeader.module.css';
import { useAccount } from '../../hooks/index';

type Props = {
  text: string;
};

export const LogoHeader: React.FC<Props> = ({ text }) => {
  const { user, logout } = useAccount();

  // const handleLogout = () => {
  //   toast.success('Logged out');
  //   localStorage.removeItem('access_token');
  //   navigate(Path.Login);
  // };

  return (
    <header className={c.header}>
      <LayoutSpacing className={c.layout}>
        <div className={c.logoContainer}>
          <img className={c.logo} src={DUMPLogo} alt="DUMP Logo" />
          <h3 className={c.text}>{text}</h3>
        </div>
        <nav className={c.navigation}>
          <p>Pozdrav {user.name}</p>
          <Button component={Link} to={Path.Dashboard}>
            Dashboard
          </Button>
          <Button component={Link} to={Path.Interviewers}>
            Intervjueri
          </Button>
          <Button component={Link} to={Path.InterviewPicker}>
            Interview scheduler
          </Button>
          <Button component={Link} to={Path.TestScheduler}>
            Test Scheduler
          </Button>
          <Button component={Link} to={Path.InterviewBuilder}>
            Interview Builder
          </Button>
          <Button onClick={() => logout()} variant="outlined" color="error">
            Logout
          </Button>
        </nav>
      </LayoutSpacing>
    </header>
  );
};
