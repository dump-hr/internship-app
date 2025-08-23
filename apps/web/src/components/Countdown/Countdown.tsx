import type { FC } from 'react';

import { useCountdown } from '../../hooks/useCountdown';

type Props = {
  toDate: Date;
};

export const Countdown: FC<Props> = ({ toDate }) => {
  const countdown = useCountdown(toDate);

  return <span>{countdown}</span>;
};
