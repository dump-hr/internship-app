import { api } from '@api/index';
import { StartTestRequest, Test } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

const startTestSlot = async (req: StartTestRequest) => {
  req = { ...req, password: localStorage.getItem('test_password') as string };

  return await api.post<never, Test>(`/test-slot/start/${req.testSlotId}`, req);
};

export const useStartTestSlot = () => {
  return useMutation(startTestSlot, {
    onMutate: () => {
      return { toastId: toast.loading('Connecting to test editor...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Connected. Good luck!', { id: context?.toastId });
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
