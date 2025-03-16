import { useQuery } from 'react-query';

import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const fetchALllInterviewQuestions = async (): Promise<InterviewQuestion[]> => {
  return api.get<never, InterviewQuestion[]>('/interview/questions');
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery<InterviewQuestion[]>(
    ['interview-questions'],
    fetchALllInterviewQuestions,
  );
};
