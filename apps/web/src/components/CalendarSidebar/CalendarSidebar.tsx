import { Discipline } from '@internship-app/types';

import { useFetchAllInternDisciplines } from '../../api/useFetchAllInternDisciplines';
import { useFetchInterviewers } from '../../api/useFetchInterviewers';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

export const CalendarSidebar = () => {
  const { data: internDisciplines } = useFetchAllInternDisciplines();
  const { data: interviewers } = useFetchInterviewers();
  return (
    <div className={styles.wrapper}>
      <CustomSelectInput
        label="Područje:"
        menuOptions={internDisciplines?.map(
          (discipline: Discipline) => discipline.discipline,
        )}
        isMultiSelect={false}
      />
      <CustomSelectInput
        label="Intervjueri:"
        menuOptions={interviewers?.map((interviewer) => interviewer.name)}
        isMultiSelect={true}
      />
      <div>
        <span>Notes:</span>
      </div>
    </div>
  );
};
