import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '../constants/paths';
import { api } from '.';

const deleteTestSlot = (slotId: string) => {
  return api.delete<never, never>(`/test-slot/${slotId}`);
};

export const useDeleteTestSlot = (slotId: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteTestSlot(slotId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['test-slot']);
      toast.success('Uspješno brisanje');
      navigate(Path.TestScheduler);
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};
