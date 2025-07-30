import type { Discipline, TestSlot } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '@api/index';

const fetchAvailableTestSlots = async (
  internId: string,
  discipline: Discipline,
) => {
  const slots = await api.get<never, TestSlot[]>(
    `/test-slot/available/${discipline}/${internId}`,
  );
  return slots.map((slot) => ({
    ...slot,
    start: new Date(slot.start),
    end: new Date(slot.end),
  }));
};

export const useFetchAvailableTestSlots = (
  internId: string | undefined,
  discipline: Discipline | undefined,
) => {
  return useQuery(
    ['test-slot', discipline, internId],
    () => fetchAvailableTestSlots(internId!, discipline!),
    {
      enabled: !!internId,
      retry: false,
    },
  );
};
