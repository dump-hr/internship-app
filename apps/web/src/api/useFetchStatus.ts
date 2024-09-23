import { Intern } from '@internship-app/types';
import { useQuery } from 'react-query';

import { unAuthApi } from '.';

const fetchStatus = (id: string) =>
  unAuthApi.get<never, Intern>(`/intern/status/${id}`);

export const useFetchStatus = (id: string) => {
  return useQuery(['status', id], () => fetchStatus(id), {
    staleTime: Infinity,
    retry: false,
  });
};
