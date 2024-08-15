import { Button } from '@mui/material';
import { Link } from 'wouter';

import DUMPLogo from '../../assets/dump-logo.png';
import { Path } from '../../constants/paths';
import LayoutSpacing from '../LayoutSpacing/LayoutSpacing';
import c from './LogoHeader.module.css';
import { useAccount } from '../../hooks/useAccount';
import toast from 'react-hot-toast';

type Props = {
  text: string;
};

const LogoHeader: React.FC<Props> = ({ text }) => {
  const user = useAccount();

  const handleLogout = () => {
    user.logout();
    toast.success('Logout successful');
  };

  return (
    <header className={c.header}>
      <LayoutSpacing className={c.layout}>
        <div className={c.logoContainer}>
          <img className={c.logo} src={DUMPLogo} alt="DUMP Logo" />
          <h3 className={c.text}>{text}</h3>
        </div>
        <nav className={c.navigation}>
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
          <Button onClick={handleLogout} variant="outlined" color="error">
            Logout
          </Button>
        </nav>
      </LayoutSpacing>
    </header>
  );
};

export default LogoHeader;
