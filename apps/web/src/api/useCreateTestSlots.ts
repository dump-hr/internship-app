import { CreateTestSlotsRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

const createTestSlots = async (req: CreateTestSlotsRequest) => {
  return await api.post<CreateTestSlotsRequest, never>(`/test-slot`, req);
};

export const useCreateTestSlots = () => {
  const queryClient = useQueryClient();

  return useMutation(createTestSlots, {
    onSuccess: () => {
      toast.success('Termini uspješno dodani!');
      queryClient.invalidateQueries('test-slot');
    },
    onError: (error: string) => {
      toast.error(`Greška pri izvođenju akcije: ${error}`);
    },
  });
};
