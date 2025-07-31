import { SubmitTestRequest } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '@constants/index';
import { api } from '@api/index';

const submitTestSlot = async (req: SubmitTestRequest) => {
  req = { ...req, password: localStorage.getItem('test_password') as string };

  return await api.post<never, string>(
    `/test-slot/submit/${req.testSlotId}`,
    req,
  );
};

export const useSubmitTestSlot = () => {
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
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
