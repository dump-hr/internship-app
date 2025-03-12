import { useQuery } from 'react-query';
import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const fetchAllInterviewQuestions = async () => {
  return api.get<never, Array<InterviewQuestion>>('/interview-question');
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery(['interview-question'], fetchAllInterviewQuestions);
};
