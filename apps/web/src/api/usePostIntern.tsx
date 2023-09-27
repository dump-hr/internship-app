import { InternCreateRequest } from '@internship-app/types';
import { useMutation } from 'react-query';

import { api } from '.';

const addIntern = async (newIntern: InternCreateRequest) => {
  return await api.post('/intern', newIntern);
};

export const usePostIntern = () => {
  return useMutation({
    mutationFn: addIntern,
    mutationKey: ['timesSubmitted'],
  });
};
