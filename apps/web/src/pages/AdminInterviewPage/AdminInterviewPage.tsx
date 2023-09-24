import { useEffect, useState } from 'react';

import { useFetchInterviewSlotsByDiscipline } from '../../api/useFetchInterviewSlots';
import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarSidebar } from '../../components/CalendarSidebar/CalendarSidebar';
import styles from './index.module.css';

export const AdminInterviewPage = () => {
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>();
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    string[] | null
  >();
  const [events, setEvents] = useState<any[]>([]);
  const { data: interviewSlots } = useFetchInterviewSlotsByDiscipline(
    selectedDiscipline || '',
  );

  useEffect(() => {}, [interviewSlots]);

  return (
    <div className={styles.wrapper}>
      <Calendar />
      <CalendarSidebar
        setDiscipline={setSelectedDiscipline}
        setInterviewers={setSelectedInterviewers}
      />
    </div>
  );
};
