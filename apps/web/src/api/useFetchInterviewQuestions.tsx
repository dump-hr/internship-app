import { Question } from '@internship-app/types';
import { useQuery } from 'react-query';
import { api } from '.';

const fetchInterviewQuestions = async (): Promise<Question[]> => {
  return await api.get<never, Question[]>('interview-questions');
};

export const useFetchInterviewQuestions = () => {
  return useQuery<Question[], Error>(
    ['interview-questions'],
    fetchInterviewQuestions,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    },
  );
};
