import {
  CompleteEvaluationResult,
  CreateEvaluationSubmissionRequest,
} from '@internship-app/types';
import { api } from '.';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

interface Params {
  questionId: string;
  body: CreateEvaluationSubmissionRequest;
}

const evaluateAnswer = async ({ questionId, body }: Params) =>
  api.post<CreateEvaluationSubmissionRequest, CompleteEvaluationResult[]>(
    `/api/test-slot/evaluate/${questionId}`,
    {
      ...body,
      password: localStorage.getItem('test_password') as string,
    },
  );

export const useEvaluateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation(evaluateAnswer, {
    onMutate: () => {},
    onSuccess: () => {
      toast.success('Answer evaluated successfully!');
      void queryClient.invalidateQueries(['interview-slot']);
    },
    onError: (error: string) => {
      toast.error(`Error evaluating answer: ${error}`);
      console.log('error evaluating answer: ', error);
    },
  });
};
