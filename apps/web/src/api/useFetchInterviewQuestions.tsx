import { InterviewQuestion } from '@internship-app/types';
import { useQuery } from 'react-query';
import { api } from '.';

const fetchInterviewQuestions = async (): Promise<InterviewQuestion[]> => {
  return await api.get<never, InterviewQuestion[]>('interview-questions');
};

export const useFetchInterviewQuestions = () => {
  return useQuery<InterviewQuestion[], Error>(
    ['interview-questions'],
    fetchInterviewQuestions,
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  );
};
