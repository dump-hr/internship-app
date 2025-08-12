import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '@api/index';
import { ErrorResponse } from '@internship-app/types';
import { checkError } from 'src/helpers/checkError';

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
    onError: (error: ErrorResponse) => {
      checkError(error, 'Greska pri ažuriranju oznake u odgovorima');
    },
  });
};
