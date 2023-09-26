import { Discipline } from '@internship-app/types';
import clsx from 'clsx';

import { calendarHelper } from '../../helpers/calendarHelper';
import styles from './index.module.css';

interface Props {
  event: unknown;
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
    <div>
      <div onClick={handleRemoveClick} className={styles.deleteEventButton}>
        &#10005;
      </div>
      {calendarHelper.getDisciplinesFromEvent(event).map((discipline) => {
        switch (discipline) {
          case Discipline.Design:
            return (
              <div
                className={clsx(styles.design, styles.disciplineIndicator)}
              />
            );
          case Discipline.Development:
            return (
              <div
                className={clsx(styles.development, styles.disciplineIndicator)}
              />
            );
          case Discipline.Marketing:
            return (
              <div
                className={clsx(styles.marketing, styles.disciplineIndicator)}
              />
            );
          case Discipline.Multimedia:
            return (
              <div
                className={clsx(styles.multimedia, styles.disciplineIndicator)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
