import { useMutation } from 'react-query';

import { api } from '.';

type EmailToCreate = {
  emails: string[];
  text: string;
};

const makeEmails = async (request: EmailToCreate) => {
  try {
    await api.post('/email', request);
  } catch (err) {
    alert(err);
  }
};

export const useMakeEmails = () => {
  return useMutation({
    mutationFn: makeEmails,
    mutationKey: ['timesSubmitted'],
  });
};
