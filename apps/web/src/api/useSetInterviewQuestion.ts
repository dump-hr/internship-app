import { SetInterviewQuestionRequest } from '@internship-app/types';
import { api } from '.';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

const setInterviewQuestion = async (req: SetInterviewQuestionRequest) => {
  return await api.put<SetInterviewQuestionRequest, never>(
    `/interview-question/setInterviewQuestion/${req.id}`,
    req,
  );
};

export const useSetInterviewQuestion = () => {
  return useMutation(setInterviewQuestion, {
    onSuccess: () => {
      toast.success('Uspjesno promijenjeno pitanje');
    },
    onError: (error: string) => {
      toast.error(`Greška pri ažuriranju pitanja: ${error}`);
    },
  });
};
