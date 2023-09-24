import { Discipline } from '@internship-app/types';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

import { useFetchInterviewersByDiscipline } from '../../api/useFetchInterviewers';
import { useFetchInterviewSlotsByDiscipline } from '../../api/useFetchInterviewSlots';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

interface Props {
  selectedStartTime?: string;
  selectedEndTime?: string;
  setDiscipline: (value: string | null) => void;
  setInterviewers: (value: string[] | null) => void;
}

export const CalendarSidebar: React.FC<Props> = ({
  selectedStartTime,
  selectedEndTime,
  setDiscipline,
  setInterviewers,
}: Props) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    string[] | null
  >(null);
  const { data: interviewers } = useFetchInterviewersByDiscipline(
    selectedDiscipline || '',
  );
  // const { data: interviewSlots } =
  //   useFetchInterviewSlotsByDiscipline(selectedDiscipline);

  useEffect(() => {
    setDiscipline(selectedDiscipline || null);
    setInterviewers(selectedInterviewers || null);
  }, [selectedInterviewers, selectedDiscipline]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.time}>
        {selectedStartTime} - {selectedEndTime}
      </h1>
      <CustomSelectInput
        label="Područje:"
        menuOptions={Object.values(Discipline)}
        isMultiSelect={false}
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
