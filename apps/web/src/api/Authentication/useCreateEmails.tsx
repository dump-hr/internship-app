import { useMutation } from 'react-query';

import { api } from '@api/index';

type EmailToCreate = {
  emails: string[];
  text: string;
};

const makeEmails = async (request: EmailToCreate) => {
  return await api.post<never, string[]>('/email', request);
};

export const useMakeEmails = () => {
  return useMutation(makeEmails);
};
