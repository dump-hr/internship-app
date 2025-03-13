import type { InterviewQuestion } from '@prisma/client';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchALllInterviewQuestions = async () => {
  return api.get<never, InterviewQuestion[]>('/interview/questions');
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery(['interview-questions'], fetchALllInterviewQuestions);
};
