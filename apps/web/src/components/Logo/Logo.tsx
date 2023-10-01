import { Box } from '@mui/material';

import dumpLogo from '../../assets/dump-logo.png';

export const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', width: 77 }}>
      <img src={dumpLogo} height={24} style={{ marginTop: '1px' }} />
    </Box>
  );
};
