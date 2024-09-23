import { CompleteEvaluationResult } from '@internship-app/types';
import { unAuthApi } from '.';
import { useQuery } from 'react-query';

const getDetailedResult = async (id: string) =>
  await unAuthApi.get<never, CompleteEvaluationResult[]>(
    `/test-slot/answers/${id}/detailed`,
  );

export const useGetDetailedResult = (id: string) => {
  return useQuery(['test-slot/answers', id], () => getDetailedResult(id));
};
