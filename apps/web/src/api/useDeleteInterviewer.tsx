import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteInterviewer = async (id: string) => {
  return api.delete(`/interviewer/${id}`);
};

export const useDeleteInterviewer = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteInterviewer, {
    onSuccess: () => {
      queryClient.invalidateQueries('interviewer');
    },
  });
};
