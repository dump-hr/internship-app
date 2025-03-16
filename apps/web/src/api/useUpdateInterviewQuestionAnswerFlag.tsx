import { InterviewQuestionAnswer } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const updateFlag = async (interviewQuestionAnswer: InterviewQuestionAnswer) => {
  console.log(interviewQuestionAnswer);
  await api.patch(
    `/interview/questions/answers/${interviewQuestionAnswer.id}`,
    { flag: interviewQuestionAnswer.flag },
  );
};

export const useUpdateInterviewQuestionAnswerFlag = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFlag, {
    onSuccess: () => {
      queryClient.invalidateQueries('interviewer/questions/answers');
    },
    onError: (error) => {
      toast.error(`Greška prilikom promjene odgovora! (${error})`);
    },
  });
};
