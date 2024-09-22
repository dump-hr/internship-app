import { useQuery } from 'react-query';
import { api } from '.';
import { TestClusterQuestionOption } from '../components/TestClusterForm/TestClusterForm';

const fetchAllQuestions = () =>
  api.get<never, TestClusterQuestionOption[]>('/question');

export const useFetchAllQuestions = () => {
  return useQuery('questions', fetchAllQuestions);
};
