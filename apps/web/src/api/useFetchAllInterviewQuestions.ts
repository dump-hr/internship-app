import { useQuery } from 'react-query';
import { api } from '.';
import {
  MultistepQuestion,
  QuestionCategory,
} from '@internship-app/types';

const fetchAllInterviewQuestions = async () => {
  return api.get<never, Array<MultistepQuestion<QuestionCategory>>>(
    '/interview-question',
  );
};

export const useFetchAllInterviewQuestions = () => {
  return useQuery(['interview-question'], fetchAllInterviewQuestions);
};
