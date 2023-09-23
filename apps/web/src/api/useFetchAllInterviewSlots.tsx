import type { InterviewSlot } from '@prisma/client';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchALllInterviewSlots = async () => {
  return api.get<never, InterviewSlot[]>('/interview-slot');
};

export const useFetchAllInterviewSlots = () => {
  return useQuery(['interview-slot'], fetchALllInterviewSlots);
};
