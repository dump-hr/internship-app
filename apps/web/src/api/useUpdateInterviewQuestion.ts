import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from './index.ts';

const updateInterviewQuestion = async ({
  id,
  question,
}: {
  id: string;
  question: string;
}) => {
  try {
    const response = await api.patch(`/interview-questions/question/${id}`, {
      question,
    });

    return response.data;
  } catch (error: any) {
    console.error(
      'Error Updateing interview question:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const useUpdateInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(updateInterviewQuestion, {
    onSuccess: () => {
      toast.success('Successfully updated question');
      queryClient.invalidateQueries(['interview-questions']);
    },
    onError: (error: string) => {
      toast.error(`Error updating interview question: ${error}`);
    },
  });
};
