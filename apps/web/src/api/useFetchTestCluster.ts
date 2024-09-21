import { useQuery } from 'react-query';
import { api } from '.';

const fetchTestCluster = (id: string) => {
  api.get(`/test-cluster/${id}`);
};

export const useFetchTestCluster = (id: string) => {
  return useQuery(['test-cluster', id], () => fetchTestCluster(id));
};
