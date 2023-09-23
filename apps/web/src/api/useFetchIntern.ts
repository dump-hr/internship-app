import { Intern } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchIntern = (id: string) => api.get<never, Intern>(`/intern/${id}`);

export const useFetchIntern = (id: string | undefined) => {
  //enabled: !!internId
  return useQuery(['intern', id], () => fetchIntern(id as string), {
    staleTime: Infinity,
    retry: false,
  });
};
