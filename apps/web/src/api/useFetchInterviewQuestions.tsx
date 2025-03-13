import { Question } from '@internship-app/types';
import { useQuery } from 'react-query';
import { api } from '.';

const fetchInterviewQuestions = async () => {
  return await api.get<never, Question[]>('interview-questions');
};

export const useFetchInterviewQuestions = () => {
  return useQuery(['interview-questions'], fetchInterviewQuestions);
};
