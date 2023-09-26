import { Discipline } from '@internship-app/types';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect, useState } from 'react';

import { useFetchInterviewers } from '../../api/useFetchInterviewers';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

interface Props {
  setSelectedDisciplineFilter: (value: string | null) => void;
  setInterviewers: (value: string[] | null) => void;
  setSelectedInterviewerFilter: (value: string[] | null) => void;
  setAdditionalNotesValue: (value: string | null) => void;
}

export const CalendarSidebar: React.FC<Props> = ({
  setInterviewers,
  setSelectedDisciplineFilter,
  setSelectedInterviewerFilter,
  setAdditionalNotesValue,
}: Props) => {
  const [disciplineFilter, setDisciplineFilter] = useState(null);
  const [interviewerFilter, setInterviewerFilter] = useState(null);
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    string[] | null
  >(null);
  const [notesValue, setNotesValue] = useState<string | null>(null);
  const { data: interviewers } = useFetchInterviewers();

  useEffect(() => {
    setSelectedDisciplineFilter(disciplineFilter || null);
    setSelectedInterviewerFilter(interviewerFilter || null);
    setInterviewers(selectedInterviewers || null);
    setAdditionalNotesValue(notesValue || null);
  }, [selectedInterviewers, disciplineFilter, interviewerFilter]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterSection}>
        <FilterAltIcon className={styles.filterIcon} />
        <CustomSelectInput
          label="Područje"
          menuOptions={Object.values(Discipline)}
          isMultiSelect={true}
          valueHandler={(value) => setDisciplineFilter(value)}
        />
      </div>
      <div className={styles.filterSection}>
        <FilterAltIcon className={styles.filterIcon} />
        <CustomSelectInput
          label="Intervjueri"
          menuOptions={interviewers?.map((interviewer) => interviewer.name)}
          isMultiSelect={true}
          valueHandler={(value) => setInterviewerFilter(value)}
        />
      </div>
      <CustomSelectInput
        label="Intervjueri"
        menuOptions={interviewers?.map((interviewer) => interviewer.name)}
        isMultiSelect={true}
        valueHandler={(value) => setSelectedInterviewers(value)}
      />
      <div>
        <div className={styles.notesLabel}>Notes:</div>
        <MultilineInput onValueChange={setNotesValue} />
      </div>
    </div>
  );
};
