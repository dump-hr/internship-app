import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from './base';

type EmailToSend = {
  emails: string[];
  text: string;
  subject: string;
};

const sendEmails = async (request: EmailToSend) => {
  return await api.post<never, string>('/email/send', request);
};

export const useSendEmails = (cleanup: () => void) => {
  return useMutation(sendEmails, {
    onMutate: () => {
      return { toastId: toast.loading('Sending email...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Emails sent', { id: context?.toastId });
      cleanup();
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
