import { Discipline } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

type InterviewerToCreate = {
  name: string;
  disciplines: Discipline[];
};

const addInterviewer = async (newInterviewer: InterviewerToCreate) => {
  await api.post('/interviewer', newInterviewer);
};

export const usePostInterviewer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addInterviewer,
    mutationKey: ['timesSubmitted'],
    onSuccess: () => {
      queryClient.invalidateQueries('interviewer');
      toast.success('Intervjuer uspješno dodan!');
    },
    onError: (error) => {
      toast.error(`Greška prilikom dodavanja intervjuera! (${error})`);
    },
  });
};
