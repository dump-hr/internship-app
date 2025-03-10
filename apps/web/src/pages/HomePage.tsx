import { Typography } from '@mui/material';
import { useEffect } from 'react';

export const HomePage = () => {
  useEffect(() => {
    const redirect = setTimeout(() => {
      window.location.href = 'https://dump.hr/internship';
    }, 1000);

    return () => {
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div>
      <Typography>Redirecting to dump.hr/internship...</Typography>
    </div>
  );
};
