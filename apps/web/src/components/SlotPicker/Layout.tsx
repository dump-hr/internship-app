import { Box, Typography, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';

import { Logo } from '@components/index';

type Props = {
  children?: ReactNode;
  title: string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
  const isMobile = useMediaQuery('(max-width:400px)');

  return (
    <Box
      sx={{
        maxWidth: '650px',
        width: '100%',
        margin: '0 auto',
        padding: isMobile ? '20px 0' : '20px',
      }}
    >
      <Box sx={{ marginLeft: '10px' }}>
        <Logo />
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          marginTop: '20px',
          padding: '20px 0',
          borderRadius: '20px',
        }}
      >
        <Typography sx={{ margin: '0 20px' }} variant="h5">
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};
