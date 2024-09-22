import { useQuery } from 'react-query';
import { api } from '.';
import { TestClusterWithTestCases } from '@internship-app/types';

const fetchTestCluster = (id: string) =>
  api.get<never, TestClusterWithTestCases>(`/test-cluster/${id}`);

export const useFetchTestCluster = (id: string) => {
  return useQuery(['test-cluster', id], () => fetchTestCluster(id));
};
