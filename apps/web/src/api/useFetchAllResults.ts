import { ResultSummary } from '@internship-app/types';
import { api } from '.';
import { useQuery } from 'react-query';

interface Params {
  questionId: string;
  internId: string;
}

const fetchAllResults = async ({ internId, questionId }: Params) =>
  api.get<never, ResultSummary[]>(
    `/api/test-slot/results/${questionId}/${internId}`,
  );

export const useFetchAllResults = ({ internId, questionId }: Params) => {
  return useQuery(['test-slot/results', questionId, internId], () =>
    fetchAllResults({ internId, questionId }),
  );
};
