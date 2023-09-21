import { Intern } from '@prisma/client';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllInterns = async () => {
  return api.get<never, Intern[]>('/intern');
};

export const useFetchAllInterns = () => {
  return useQuery(['intern'], fetchAllInterns);
};
