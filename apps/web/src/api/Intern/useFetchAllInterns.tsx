import type { InternForDashboard } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from './base';

const fetchAllInterns = async () => {
  return api.get<never, InternForDashboard[]>('/intern');
};

export const useFetchAllInterns = () => {
  return useQuery(['intern'], fetchAllInterns);
};
