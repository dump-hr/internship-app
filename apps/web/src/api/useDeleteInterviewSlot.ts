import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const deleteInterviewSlot = (slotId: string) =>
  api.delete<never, never>(`/interview-slot/${slotId}`);

export const useDeleteInterviewSlot = (slotId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation(deleteInterviewSlot, {
    onSuccess: () => {
      if (slotId) {
        void queryClient.invalidateQueries(['interview-slot', slotId]);
      }
    },
  });
};
