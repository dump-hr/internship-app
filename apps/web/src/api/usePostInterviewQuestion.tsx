import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { api } from '.';
import { InterviewQuestion } from '@internship-app/types';

const addInterviewQuestion = async (newQuestion: InterviewQuestion) => {
  await api.post('/interview-question', newQuestion);
};

export const usePostInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(addInterviewQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('interview-question');
      toast.success('Pitanje uspješno dodano!');
    },
    onError: (error: any) => {
      toast.error(`Greška prilikom dodavanja pitanja! (${error})`);
    },
  });
};
