import { SubmitTestRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '../constants/paths';
import { api } from '.';

const submitTestSlot = async (req: SubmitTestRequest) => {
  return await api.post<never, string>(
    `/test-slot/submit/${req.testSlotId}`,
    req,
  );
};

export const useSubmitTestSlot = (cleanup: () => void) => {
  return useMutation(submitTestSlot, {
    onMutate: () => {
      return { toastId: toast.loading('Submitting test...') };
    },
    onSuccess: (data, _variables, context) => {
      toast.success('Test submitted!', {
        id: context?.toastId,
        duration: 5000,
      });
      navigate(Path.Status.replace(':internId', data));
      cleanup();
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
