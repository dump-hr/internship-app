import { Box, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const INTERVIEW_TIME = 1200;

export default function CountdownTimer({ isRunning }: { isRunning: boolean }) {
  const [seconds, setSeconds] = useState(INTERVIEW_TIME);

  useEffect(() => {
    if (!isRunning) return;
    if (seconds <= 0) {
      toast.success('GOTOVO');
      return;
    }
    if (seconds === 300) toast.success('Prošlo je 15 minuti. ZAVRŠAVAJ');

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, isRunning]);

  const progress = (seconds / INTERVIEW_TIME) * 100;

  const formatTime = (totalSeconds: number) => {
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
