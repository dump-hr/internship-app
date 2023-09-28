import { useMutation } from 'react-query';

import { api } from '.';

type EmailToSend = {
  emails: string[];
  text: string;
  subject: string;
};

const sendEmails = async (request: EmailToSend) => {
  return await api.post<never, string>('/email/send', request);
};

export const useSendEmails = () => {
  return useMutation({
    mutationFn: sendEmails,
    mutationKey: ['timesSubmitted'],
  });
};
