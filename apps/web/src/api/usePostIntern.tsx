import { useMutation } from 'react-query';

import { FormValues } from '../pages/ApplicationFormPage/ApplicationFormPage';
import { api } from '.';

const addIntern = async (newIntern: FormValues) => {
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
