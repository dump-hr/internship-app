import { Discipline } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchInternDiscipline = async (internId: string) => {
  return api.get<number, Discipline>(`/interview-slot/${internId}`);
};

export const useFetchInternDiscipline = (internId: string) => {
  return useQuery(['interview-slot'], () => fetchInternDiscipline(internId));
};
