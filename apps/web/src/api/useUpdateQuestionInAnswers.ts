import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from './index.ts';

const updateQuestionInAnswers = async ({
  id,
  question,
  answerId,
}: {
  id: string;
  question: string;
  answerId: string;
}) => {
  try {
    const response = await api.patch(`/interview-slot/answers/${id}`, {
      question,
      answerId,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating question in answers');
    toast.error('Error updating question in answers');
    throw error;
  }
};

export const useUpdateQuestionInAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation(updateQuestionInAnswers, {
    onSuccess: () => {
      toast.success('Successfully updated question in answers');
      queryClient.invalidateQueries(['interview-slots']);
    },
    onError: (error: string) => {
      toast.error(`Error updating question in answers: ${error}`);
    },
  });
};
