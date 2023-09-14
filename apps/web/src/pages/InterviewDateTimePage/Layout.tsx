import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { Logo } from '../../components/Logo';

type Props = {
  children?: ReactNode;
  title: ReactNode | string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <Box
      sx={{
        maxWidth: '650px',
        width: 'calc(100% - 40px)',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <Logo />
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
