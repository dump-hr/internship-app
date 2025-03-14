import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const usePutInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: any }) =>
      axios.put(`/api/interview-questions/${id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('questions');
      },
    },
  );
};
