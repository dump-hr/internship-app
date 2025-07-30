import { Intern, InternCreateRequest } from '@internship-app/types';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { navigate } from 'wouter/use-location';

import { Path } from '@constants/index';
import { api } from '@api/index';

const addIntern = async (newIntern: InternCreateRequest) => {
  return await api.post<InternCreateRequest, Intern>('/intern', newIntern);
};

export const usePostIntern = () => {
  return useMutation(addIntern, {
    onMutate: () => {
      return { toastId: toast.loading('Slanje prijave...') };
    },
    onSuccess: (data, _variables, context) => {
      toast.success('Prijava uspješno poslana!', { id: context?.toastId });
      navigate(Path.Status.replace(':internId', data.id));
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
