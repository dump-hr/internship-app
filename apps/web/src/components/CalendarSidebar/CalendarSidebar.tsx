import { Discipline } from '@internship-app/types';
import { useEffect, useState } from 'react';

import { useFetchInterviewers } from '../../api/useFetchInterviewers';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

interface Props {
  setDiscipline: (value: string | null) => void;
  setInterviewers: (value: string[] | null) => void;
}

export const CalendarSidebar: React.FC<Props> = ({
  setDiscipline,
  setInterviewers,
}: Props) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    string[] | null
  >(null);
  const { data: interviewers } = useFetchInterviewers();

  useEffect(() => {
    setDiscipline(selectedDiscipline || null);
    setInterviewers(selectedInterviewers || null);
  }, [selectedInterviewers, selectedDiscipline]);

  return (
    <div className={styles.wrapper}>
      <CustomSelectInput
        label="Područje:"
        menuOptions={Object.values(Discipline)}
        isMultiSelect={true}
        valueHandler={(value) => setSelectedDiscipline(value)}
      />
      <CustomSelectInput
        label="Intervjueri:"
        menuOptions={interviewers?.map((interviewer) => interviewer.name)}
        isMultiSelect={true}
        valueHandler={(value) => setSelectedInterviewers(value)}
      />
      <div>
        <div className={styles.notesLabel}>Notes:</div>
        <MultilineInput />
      </div>
    </div>
  );
};
