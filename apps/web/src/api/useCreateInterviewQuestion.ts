import { useMutation, useQueryClient } from 'react-query';

import { api } from './index.ts';
import { InterviewQuestion } from '@internship-app/types';

const createInterviewQuestion = (data: InterviewQuestion) =>
  api.post<InterviewQuestion, never>('/interview-questions', data);

export const useCreateInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(createInterviewQuestion, {
    onMutate: () => {},
    onSuccess: () => {
      void queryClient.invalidateQueries(['interview-question']);
    },
    onError: (error: string) => {
      console.log('error creating interview question: ', error);
    },
  });
};
