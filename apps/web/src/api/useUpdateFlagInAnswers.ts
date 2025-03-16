import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from './index.ts';

const updateFlagInAnswers = async ({
  slotId,
  tick,
  answerId,
}: {
  slotId: string;
  tick: boolean;
  answerId: string;
}) => {
  try {
    const response = await api.patch(`interview-slot/tick/${slotId}`, {
      tick,
      answerId,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating flag');
    throw error;
  }
};

export const useUpdateFlagInAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFlagInAnswers, {
    onSuccess: () => {
      toast.success('Successfully updated flag in answers');
      queryClient.invalidateQueries(['interview-slot']);
    },
    onError: (error: string) => {
      toast.error(`Error updating flag: ${error}`);
    },
  });
};
