import { useQuery } from 'react-query';
import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const fetchInterviewQuestions = async () => {
  return await api.get<never, InterviewQuestion[]>('interview-question');
};

export function useFetchInterviewQuestions() {
  return useQuery(['interview-question'], fetchInterviewQuestions);
}
