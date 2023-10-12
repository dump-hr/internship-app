import { useEffect, useState } from 'react';

export const useCountdown = (countDownDate: Date) => {
  const [countDown, setCountDown] = useState(
    countDownDate.getTime() - new Date().getTime(),
  );

  useEffect(() => {
    if (countDown <= 0) return;
    const interval = setInterval(() => {
      setCountDown(countDownDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDownDate]);

  return toString(countDown);
};

const toString = (countdown: number) => {
  if (countdown < 1) return 'TIME EXPIRED';
  const portions = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(countdown / msInHour);
  if (hours > 0) {
    portions.push(hours + 'h');
    countdown = countdown - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(countdown / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + 'm');
    countdown = countdown - minutes * msInMinute;
  }

  const seconds = Math.trunc(countdown / 1000);
  if (seconds > 0) {
    portions.push(seconds + 's');
  }

  return portions.join(' ');
};
