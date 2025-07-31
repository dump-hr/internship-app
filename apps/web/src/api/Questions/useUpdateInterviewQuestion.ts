import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '@api/index';

const updateInterviewQuestion = async ({
  id,
  question,
  disabled,
}: {
  id: string;
  question: string;
  disabled: boolean;
}) => {
  return api.patch(`/interview-questions/question/${id}`, {
    question,
    disabled,
  });
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
