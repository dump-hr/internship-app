import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import toast from 'react-hot-toast';

export default function CountdownTimer({ initialSeconds = 1200 }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    if (seconds === 1195) toast.success('Prošlo je 15 minuti. ZAVRŠAVAJ');

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const progress = (seconds / initialSeconds) * 100;

  const formatTime = (totalSeconds: any) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      p={2}
      sx={{ width: '250px' }}
    >
      <Typography variant="h6">Time left: {formatTime(seconds)}</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: '100%',
          height: 10,
          borderRadius: 5,
        }}
      />
    </Box>
  );
}
