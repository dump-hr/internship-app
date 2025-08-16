import { api } from '@api/index';
import { useQuery } from 'react-query';

const fetchCount = () => api.get<never, number>('/intern/count');

export const useFetchCount = () => {
  return useQuery(['count'], () => fetchCount(), {
    refetchInterval: 10000,
  });
};
