import { Intern } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '@api/index';

const fetchStatus = (id: string) =>
  api.get<never, Intern>(`/intern/status/${id}`);

export const useFetchStatus = (id: string) => {
  return useQuery(['status', id], () => fetchStatus(id), {
    staleTime: Infinity,
    retry: false,
  });
};
