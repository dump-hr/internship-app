import { useQuery } from 'react-query';
import { api } from '.';
import { InterviewQuestion, Question } from '@internship-app/types';

const fetchAllInterviewQuestions = async () => {
  return api.get<never, Array<Question>>('/interview-question');
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery(['interview-question'], fetchAllInterviewQuestions);
};
