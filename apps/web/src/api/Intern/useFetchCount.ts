import { useQuery } from 'react-query';

import { api } from '../base';

const fetchCount = () => api.get<never, number>('/intern/count');

export const useFetchCount = () => {
  return useQuery(['count'], () => fetchCount(), {
    refetchInterval: 10000,
  });
};
