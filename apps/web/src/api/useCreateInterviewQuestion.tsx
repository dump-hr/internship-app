import { CreateInterviewQuestionDto } from 'api/dist/src/interview-questions/dto/createInterviewQuestion.dto.ts';
import { useMutation, useQueryClient } from 'react-query';

import { api } from './index.ts';

const createInterviewQuestion = (data: CreateInterviewQuestionDto) =>
  api.post<CreateInterviewQuestionDto, never>('/interview-questions', data);

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
