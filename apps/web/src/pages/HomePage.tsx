import { Typography } from '@mui/material';
import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      window.location.href = 'https://dump.hr/internship';
    }, 3000);

    return () => {
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div>
      <Typography>internship-app</Typography>
      <Typography>Redircting to dump.hr/internship</Typography>
    </div>
  );
};
