import toast from 'react-hot-toast';
import { api } from '.';
import { useMutation } from 'react-query';
import { SetAnswerFlagRequest } from '@internship-app/types';

const setAnswerFlag = async (req: SetAnswerFlagRequest) => {
  console.log('req', req);
  return await api.patch(`interview-slot/flag-answer/${req.slotId}`, {
    questionId: req.questionId,
  });
};

export const useSetAnswerFlag = () => {
  return useMutation(setAnswerFlag, {
    onSuccess: () => {
      toast.success('Odgovor je flagan!');
    },
    onError: (error: string) => {
      toast.error(`Greška pri flaganju odgovora: ${error}`);
    },
  });
};
