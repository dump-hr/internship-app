import { useQuery } from 'react-query';

import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const fetchEnabledlInterviewQuestions = async (): Promise<
  InterviewQuestion[]
> => {
  return api.get<never, InterviewQuestion[]>('/interview/questions/enabled');
};

export const useFetchEnabledInterviewQuestions = () => {
  return useQuery<InterviewQuestion[]>(
    ['interview-questions-enabled'],
    fetchEnabledlInterviewQuestions,
  );
};
