import { TestCluster } from '@internship-app/types';
import { api } from '.';
import { useQuery } from 'react-query';

export const fetchTestClusters = (questionId?: string) =>
  api.get<never, TestCluster[]>('/test-cluster', {
    params: {
      questionId,
    },
  });

export const useFetchTestClusters = (questionId?: string) => {
  return useQuery(['test-cluster', questionId], () =>
    fetchTestClusters(questionId),
  );
};
