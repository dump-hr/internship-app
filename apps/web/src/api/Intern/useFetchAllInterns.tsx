import { api } from '@api/index';
import type { InternForDashboard } from '@internship-app/types';
import { useQuery } from 'react-query';

const fetchAllInterns = async () => {
  return api.get<never, InternForDashboard[]>('/intern');
};

export const useFetchAllInterns = () => {
  return useQuery(['intern'], fetchAllInterns);
};
