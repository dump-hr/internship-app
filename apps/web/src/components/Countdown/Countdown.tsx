import { useCountdown } from '../../hooks/useCountdown';
import type { FC } from 'react';

type Props = {
  toDate: Date;
};

export const Countdown: FC<Props> = ({ toDate }) => {
  const countdown = useCountdown(toDate);

  return <span>{countdown}</span>;
};
