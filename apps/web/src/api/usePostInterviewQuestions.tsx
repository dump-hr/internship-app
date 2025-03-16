import { InterviewQuestion } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const saveChanges = async (interviewQuestions: InterviewQuestion[]) => {
  await api.post('/interview/questions/save', interviewQuestions);
};

export const usePostInterviewQuestions = () => {
  const queryClient = useQueryClient();

  return useMutation(saveChanges, {
    onSuccess: () => {
      queryClient.invalidateQueries('interviewer/questions');
      toast.success('Promjene uspješno spremljene!');
    },
    onError: (error) => {
      toast.error(`Greška prilikom spremanja promjena! (${error})`);
    },
  });
};
