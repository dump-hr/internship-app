import { useMutation } from 'react-query';

import { api } from '.';

type EmailToCreate = {
  emails: string[];
  text: string;
};

const makeEmails = async (request: EmailToCreate) => {
  return await api.post('/email', request);
};

export const useMakeEmails = () => {
  return useMutation({
    mutationFn: makeEmails,
    mutationKey: ['timesSubmitted'],
  });
};
