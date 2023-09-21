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
    </div>
  );
};
