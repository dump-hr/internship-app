import { InterviewQuestion } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const updateInterviewQuestion = async (question: InterviewQuestion) => {
  return await api.patch<never, InterviewQuestion>(
    `/interview-questions`,
    question,
  );
};

export const useUpdateInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(updateInterviewQuestion, {
    onMutate: () => {
      const toastId = toast.loading('Ažuriranje pitanja...');
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Pitanje uspješno ažurirano', { id: context?.toastId });
      queryClient.invalidateQueries('interview-questions');
    },
    onError: (error: string, _variables, context) => {
      toast.error(error || 'Došlo je do greške pri ažuriranju pitanja', {
        id: context?.toastId,
      });
      queryClient.invalidateQueries('interview-questions');
    },
  });
};
