import { useMutation } from 'react-query';

import { api } from '.';

type EmailToCreate = {
  emails: string[];
  text: string;
};

const makeEmails = async (request: EmailToCreate) => {
  try {
    const response = await api.post('/email', request);
    console.log(response);
    return response.data;
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
