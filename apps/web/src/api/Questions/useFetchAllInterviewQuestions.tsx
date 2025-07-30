import { Question } from '@internship-app/types/';
import { useQuery } from 'react-query';

import { api } from './base.ts';

const fetchAllInterviewQuestions = async () => {
  return api.get<never, Question[]>('/interview-questions');
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery(['interview-questions'], fetchAllInterviewQuestions);
};
