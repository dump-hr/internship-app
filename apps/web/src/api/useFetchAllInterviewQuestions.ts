import { MultistepQuestion } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';
import { QuestionCategory } from '../constants/interviewConstants';

const fetchAllInterviewQuestions = async () => {
  return api.get<never, Array<MultistepQuestion<QuestionCategory>>>('/interview-question');
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery(['interview-question'], fetchAllInterviewQuestions);
};
