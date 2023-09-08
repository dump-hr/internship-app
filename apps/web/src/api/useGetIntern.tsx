import { Intern } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const getIntern = async (id: string | undefined) => {
  try {
    const response = await api.get<string | undefined, Intern>(`/intern/${id}`);
    return response;
  } catch (err) {
    alert(err);
  }
};

export const useGetIntern = (id: string | undefined) => {
  return useQuery(['intern'], () => getIntern(id));
};
