import { api } from '@api/index';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

const updateFlagInAnswers = async ({
  slotId,
  tick,
  answerId,
}: {
  slotId: string;
  tick: boolean;
  answerId: string;
}) => {
  return api.patch(`interview-slot/tick/${slotId}`, {
    tick,
    answerId,
  });
};

export const useUpdateFlagInAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFlagInAnswers, {
    onSuccess: () => {
      toast.success('Successfully updated flag in answers');
      queryClient.invalidateQueries(['interview-slot']);
    },
    onError: () => {
      toast.error('Greska pri ažuriranju oznake u odgovorima');
    },
  });
};
