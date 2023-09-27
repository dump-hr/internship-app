import type { InterviewSlot } from '@prisma/client';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAvailableInterviewSlots = async (internId: string) => {
  const slots = await api.get<never, InterviewSlot[]>(
    `/interview-slot/available/${internId}`,
  );
  return slots.map((slot) => ({
    ...slot,
    start: new Date(slot.start),
    end: new Date(slot.end),
  }));
};

export const useFetchAvailableInterviewSlots = (
  internId: string | undefined,
) => {
  return useQuery(
    ['interview-slot', internId],
    () => fetchAvailableInterviewSlots(internId!),
    {
      enabled: !!internId,
      retry: false,
    },
  );
};
