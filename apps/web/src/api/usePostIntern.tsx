import { Intern } from '@internship-app/types';
import { useMutation } from 'react-query';

import { api } from '.';

const addIntern = async (newIntern: Intern) => {
  return await api.post('/intern', newIntern);
};

export const usePostIntern = () => {
  return useMutation({
    mutationFn: addIntern,
    mutationKey: ['timesSubmitted'],
  });
};
