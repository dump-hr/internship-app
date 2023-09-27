import { Discipline } from '@internship-app/types';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect, useState } from 'react';

import { useFetchInterviewers } from '../../api/useFetchInterviewers';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

interface Props {
  setSelectedDisciplineFilter: (value: string[] | null | undefined) => void;
  setInterviewers: (value: string[] | null) => void;
  setSelectedInterviewerFilter: (value: string[] | null) => void;
  setAdditionalNotesValue: (value: string | undefined) => void;
}

export const CalendarSidebar: React.FC<Props> = ({
  setInterviewers,
  setSelectedDisciplineFilter,
  setSelectedInterviewerFilter,
  setAdditionalNotesValue,
}: Props) => {
  const { data: interviewers } = useFetchInterviewers();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterSection}>
        <FilterAltIcon className={styles.filterIcon} />
        <CustomSelectInput
          label="Područje"
          menuOptions={Object.values(Discipline)}
          isMultiSelect={true}
          valueHandler={(value) =>
            setSelectedDisciplineFilter(
              typeof value === 'string' ? [value] : value,
            )
          }
        />
      </div>
      <div className={styles.filterSection}>
        <FilterAltIcon className={styles.filterIcon} />
        <CustomSelectInput
          label="Intervjueri"
          menuOptions={interviewers?.map((interviewer) => interviewer.name)}
          isMultiSelect={true}
          valueHandler={(value) =>
            setSelectedInterviewerFilter(
              typeof value === 'string' ? [value] : value,
            )
          }
        />
      </div>
      <CustomSelectInput
        label="Intervjueri"
        menuOptions={interviewers?.map((interviewer) => interviewer.name)}
        isMultiSelect={true}
        valueHandler={(value) =>
          setInterviewers(typeof value === 'string' ? [value] : value)
        }
      />
      <div>
        <div className={styles.notesLabel}>Notes:</div>
        <MultilineInput onValueChange={setAdditionalNotesValue} />
      </div>
    </div>
  );
};
