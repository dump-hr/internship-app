import type { Answer } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllAnswers = async (id: string) => {
  return api.get<never, Answer[]>(`interview-questions/statistic/${id}`);
};

export const useFetchAllAnswers = (id: string) => {
  return useQuery(['answers', id], () => fetchAllAnswers(id), {
    enabled: !!id,
    staleTime: 0,
    cacheTime: 1000 * 60 * 15,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });
};
