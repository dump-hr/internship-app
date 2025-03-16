import type { Answer } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllAnswers = async (id: string) => {
  return api.get<never, Answer[]>(`interview-questions/statistic/${id}`);
};

export const useFetchAllAnswers = (id: string) => {
  return useQuery(['answers', id], () => fetchAllAnswers(id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
  });
};
