import { Discipline, Event, InterviewStatus } from '@internship-app/types';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { calendarHelper } from '../../helpers/calendarHelper';
import styles from './index.module.css';

interface Props {
  event: Event;
  eventDeleteHandler: (event: Event) => void;
}

export const EventContent = ({ event, eventDeleteHandler }: Props) => {
  const eventEl = useRef(null);
  const handleRemoveClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    eventDeleteHandler(event);
  };

  const backgroundEventColor = clsx({
    '#bf8e83': event.status === InterviewStatus.NoRight,
    '#2aa8e0': event.status === InterviewStatus.PickTerm,
    '#80b089': event.status === InterviewStatus.Pending,
    '#cbb979': event.status === InterviewStatus.Done,
    '#a67a93': event.status === InterviewStatus.Missed,
  });

  useEffect(() => {
    if (!eventEl.current) return;
    const mainEventContainer = (eventEl.current as HTMLElement).closest(
      '.rbc-event',
    );
    if (!mainEventContainer) return;
    (mainEventContainer as HTMLElement).style.backgroundColor =
      backgroundEventColor;
  }, [eventEl, backgroundEventColor]);

  return (
    <Tooltip title={event.additionalInfo} arrow placement="top-start">
      <div ref={eventEl}>
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
