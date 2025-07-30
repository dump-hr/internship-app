import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '@api/index';

const deleteInterviewSlot = (slotId: string) => {
  return api.delete<never, never>(`/interview-slot/${slotId}`);
};

export const useDeleteInterviewSlot = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteInterviewSlot, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['interview-slot']);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
