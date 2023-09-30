import { TestSlot } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchTestSlot = (id: string) =>
  api.get<never, TestSlot>(`/test-slot/${id}`);

export const useFetchTestSlot = (id: string | undefined) => {
  return useQuery(['test-slot', id], () => fetchTestSlot(id as string), {
    enabled: !!id,
    staleTime: Infinity,
    retry: false,
  });
};
