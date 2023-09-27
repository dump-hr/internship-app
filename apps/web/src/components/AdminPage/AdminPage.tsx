import { Box, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import { Link } from 'wouter';
import { navigate } from 'wouter/use-location';

import { Path } from '../../constants/paths';
import { Logo } from '../Logo';

type Props = {
  children?: React.ReactNode;
};

const AdminPage: React.FC<Props> = ({ children }) => {
  const handleLogout = () => {
    toast.success('Logged out');
    localStorage.removeItem('access_token');
    navigate(Path.Login);
  };

  return (
    <Box maxWidth="1280px" margin="auto" padding="20px">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <Logo />
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Button component={Link} to={Path.Dashboard}>
            Dashboard
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default AdminPage;
