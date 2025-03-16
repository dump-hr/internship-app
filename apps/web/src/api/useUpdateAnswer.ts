import { Answer } from '@internship-app/types';
import { api } from '.';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

const updateAnswer = async (answer: Answer) => {
  return await api.patch<never, Answer>(`/interview-slot/statistics`, answer);
};

export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation(updateAnswer, {
    onMutate: () => {
      const toastId = toast.loading('Ažuriranje pitanja...');
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Odgovor uspješno ažuriran', { id: context?.toastId });
      queryClient.invalidateQueries(['question-answers']);
    },
    onError: (error: string, _variables, context) => {
      toast.error(error || 'Došlo je do greške pri ažuriranju odgovora', {
        id: context?.toastId,
      });
      queryClient.invalidateQueries(['question-answers']);
    },
  });
};
