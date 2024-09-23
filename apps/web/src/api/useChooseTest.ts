import { ChooseTestRequest, TestSlot } from '@internship-app/types';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { unAuthApi } from '.';

const chooseTest = async (req: ChooseTestRequest) => {
  if (!req.password)
    req = { password: localStorage.getItem('test_password') as string };

  return await unAuthApi.post<ChooseTestRequest, TestSlot>(
    `/test-slot/choose`,
    req,
  );
};

export const useChooseTest = () => {
  return useMutation(chooseTest, {
    onMutate: () => {
      return { toastId: toast.loading('Učitavanje...') };
    },
    onSuccess: (data, _variables, context) => {
      toast.success(`Incoming: ${moment(data.start).format('DD.MM. HH:mm')}`, {
        id: context?.toastId,
      });

      localStorage.setItem('test_password', data.password);
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
