import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

export const CalendarSidebar = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <span>Područje:</span>
        <CustomSelectInput />
      </div>
      <div>
        <span>Intervjueri:</span>
        <CustomSelectInput />
      </div>
      <div>
        <span>Notes:</span>
      </div>
    </div>
  );
};
