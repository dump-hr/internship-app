import { InterviewSlot } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchInterviewSlots = async () => {
  return api.get<never, InterviewSlot[]>('/interview-slot');
};

const fetchInterviewSlotsByDiscipline = async (discipline: string) => {
  return api.get<never, InterviewSlot[]>(
    `/interview-slot/get-by-discipline/${discipline}`,
  );
};

export const useFetchInterviewSlotsByDiscipline = (discipline: string) => {
  return useQuery(['interview-slots', discipline], () => {
    if (discipline.length === 0) {
      return fetchInterviewSlots();
    } else {
      return fetchInterviewSlotsByDiscipline(discipline);
    }
  });
};
