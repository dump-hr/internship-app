import { Intern } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const getIntern = async (id: string) => {
  return await api.get<never, Intern>(`/intern/${id}`);
};

export const useGetIntern = (id?: string) => {
  return useQuery(['intern'], () => getIntern(id!), {
    enabled: !!id,
    retry: false,
  });
};
