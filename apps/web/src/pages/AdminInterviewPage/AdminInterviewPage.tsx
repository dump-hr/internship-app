import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarSidebar } from '../../components/CalendarSidebar/CalendarSidebar';
import styles from './index.module.css';

export const AdminInterviewPage = () => {
  return (
    <div className={styles.wrapper}>
      <Calendar />
      <CalendarSidebar />
    </div>
  );
};
