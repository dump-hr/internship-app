import { useCountdown } from '../../hooks/useCountdown';

type Props = {
  toDate: Date;
};

export const Countdown: React.FC<Props> = ({ toDate }) => {
  const countdown = useCountdown(toDate);

  return <span>{countdown}</span>;
};
