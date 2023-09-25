import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteInterviewSlot = (slotId: string) => {
  return api.delete<never, never>(`/interview-slot/${slotId}`);
};

export const useDeleteInterviewSlot = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteInterviewSlot, {
    onSuccess: () => {
      void queryClient.invalidateQueries(['interview-slot']);
    },
  });
};
