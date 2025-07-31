import { TestSlot } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '@api/index';

const fetchTestSlot = async (id: string) => {
  const slot = await api.get<never, TestSlot>(`/test-slot/${id}`);
  return {
    ...slot,
    start: new Date(slot.start),
    end: new Date(slot.end),
  } as TestSlot;
};

export const useFetchTestSlot = (id: string | undefined) => {
  return useQuery(['test-slot', id], () => fetchTestSlot(id as string), {
    enabled: !!id,
    staleTime: Infinity,
    retry: false,
  });
};
