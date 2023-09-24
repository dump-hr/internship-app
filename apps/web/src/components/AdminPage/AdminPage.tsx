import { Box, Button } from '@mui/material';
import { Link } from 'wouter';

import { Path } from '../../constants/paths';
import { Logo } from '../Logo';

type Props = {
  children?: React.ReactNode;
};

const AdminPage: React.FC<Props> = ({ children }) => {
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
          <Button component={Link} to={Path.Logout}>
            Logout
          </Button>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default AdminPage;
