import { Intern } from '@internship-app/types';
import { useMutation } from 'react-query';

import { api } from '.';

const addIntern = async (newIntern: Intern) => {
  try {
    await api.post('/intern', newIntern);
  } catch (err) {
    alert(err);
  }
};

export const usePostIntern = () => {
  return useMutation({
    mutationFn: addIntern,
    mutationKey: ['timesSubmitted'],
  });
};
