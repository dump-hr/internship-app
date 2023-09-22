import { Discipline } from '@internship-app/types';
import { useEffect, useState } from 'react';

import { useFetchInterviewersByDiscipline } from '../../api/useFetchInterviewers';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

const colorMappings = {
  [Discipline.Development]: '#369354',
  [Discipline.Design]: '#297ABC',
  [Discipline.Marketing]: '#F54558',
  [Discipline.Multimedia]: '#6A5CB0',
};

interface Props {
  selectedStartTime?: string;
  selectedEndTime?: string;
}

export const CalendarSidebar: React.FC<Props> = ({
  selectedStartTime,
  selectedEndTime,
}: Props) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const { data: interviewers } =
    useFetchInterviewersByDiscipline(selectedDiscipline);

  useEffect(() => {
    if (!selectedDiscipline.length) return;

    document.documentElement.style.setProperty(
      '--main-calendar-color',
      colorMappings[selectedDiscipline],
    );
  }, [selectedDiscipline]);

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
      />
      <div>
        <div className={styles.notesLabel}>Notes:</div>
        <MultilineInput />
      </div>
    </div>
  );
};
