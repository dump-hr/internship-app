import { InterviewQuestionAnswer } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const addAnswers = async (
  interviewQuestionsAnswers: InterviewQuestionAnswer[],
) => {
  await api.post('/interview/questions/answers', interviewQuestionsAnswers);
};

export const usePostInterviewQuestionAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation(addAnswers, {
    onSuccess: () => {
      queryClient.invalidateQueries('interviewer/questions/answers');
      toast.success('Odgovori uspješno spremljeni!');
    },
    onError: (error) => {
      toast.error(`Greška prilikom spremanja odgovora! (${error})`);
    },
  });
};
