import { Box, Typography } from '@mui/material';

import dumpLogo from '../../assets/dump-logo.png';

export const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', width: 200 }}>
      <img src={dumpLogo} height={24} style={{ marginTop: '1px' }} />
      <Typography sx={{ fontSize: '24px' }}>Internship</Typography>
    </Box>
  );
};
