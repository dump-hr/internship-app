import { Discipline } from '@internship-app/types';

import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

export const CalendarSidebar = () => {
  return (
    <div className={styles.wrapper}>
      <CustomSelectInput
        label="Područje:"
        menuOptions={[
          Discipline.Development,
          Discipline.Design,
          Discipline.Multimedia,
          Discipline.Marketing,
        ]}
        isMultiSelect={false}
      />
      <CustomSelectInput
        label="Intervjueri:"
        menuOptions={}
        isMultiSelect={true}
      />
      <div>
        <span>Notes:</span>
      </div>
    </div>
  );
};
