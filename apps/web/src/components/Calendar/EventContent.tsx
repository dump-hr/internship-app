import { Discipline, Event, InterviewSlot } from '@internship-app/types';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';

import { calendarHelper } from '../../helpers/calendarHelper';
import styles from './index.module.css';

interface Props {
  event: Event;
  eventDeleteHandler: (event: unknown) => void;
}

export const EventContent = ({ event, eventDeleteHandler }: Props) => {
  const handleRemoveClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    eventDeleteHandler(event);
  };
  return (
    <Tooltip title={event.additionalInfo} arrow placement="top-start">
      <div>
        <div onClick={handleRemoveClick} className={styles.deleteEventButton}>
          &#10005;
        </div>
        {calendarHelper.getDisciplinesFromEvent(event).map((discipline) => {
          const disciplineStyle = clsx(styles.disciplineIndicator, {
            [styles.design]: discipline === Discipline.Design,
            [styles.development]: discipline === Discipline.Development,
            [styles.marketing]: discipline === Discipline.Marketing,
            [styles.multimedia]: discipline === Discipline.Multimedia,
          });
          return <div className={disciplineStyle} />;
        })}
      </div>
    </Tooltip>
  );
};
