import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const usePostInterviewQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (questionData: any) => axios.post('/api/interview-questions', questionData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('questions');
      },
    },
  );
};
