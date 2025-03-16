import { QuestionAvailabilityRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

const setQuestionAvailability = async (req: QuestionAvailabilityRequest) => {
  return await api.put<QuestionAvailabilityRequest, never>(
    `/interview-question/setAvailability/${req.questionId}`,
    req,
  );
};

export const useSetQuestionAvailability = () => {
  return useMutation(setQuestionAvailability, {
    onSuccess: () => {
      toast.success('Promijenjena dostupnost pitanja je uspjesna!');
    },
    onError: (error: string) => {
      toast.error(`Greška pri pohranjivanju odluke: ${error}`);
    },
  });
};
