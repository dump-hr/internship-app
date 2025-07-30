import { SetScoreRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '@api/index';

const setTestScore = async (req: SetScoreRequest) => {
  return await api.put<SetScoreRequest, never>(
    `/test-slot/score/${req.answerId}`,
    req,
  );
};

export const useSetTestScore = () => {
  return useMutation(setTestScore, {
    onMutate: () => {
      return { toastId: toast.loading('Setting test score...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Test score set!', { id: context?.toastId });
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
