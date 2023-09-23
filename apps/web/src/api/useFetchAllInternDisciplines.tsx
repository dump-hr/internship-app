import type { InternDiscipline } from '@prisma/client';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllInternDisciplines = async () => {
  return api.get<never, InternDiscipline[]>('/intern-discipline');
};

export const useFetchAllInternDisciplines = () => {
  return useQuery(['intern-discipline'], fetchAllInternDisciplines);
};
