import { InterviewSlot } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllInterviewSlots = async () => {
  return api.get<never, InterviewSlot[]>('/interview-slot');
};

export const useFetchAllInterviewSlots = () => {
  return useQuery(['interview-slot'], fetchAllInterviewSlots);
};
