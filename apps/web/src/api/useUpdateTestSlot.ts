import { TestSlot, UpdateTestSlotRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const updateTestSlot = async (req: UpdateTestSlotRequest) => {
  return await api.put<TestSlot, never>(`/test-slot/${req.testSlotId}`, req);
};

export const useUpdateTestSlot = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTestSlot, {
    onSuccess: (_data, variables) => {
      toast.success('Promjene uspješno pohranjene!');
      queryClient.invalidateQueries(['test-slot', variables.testSlotId]);
    },
    onError: (error: string) => {
      toast.error(`Greška pri pohranjivanju promjena: ${error}`);
    },
  });
};
