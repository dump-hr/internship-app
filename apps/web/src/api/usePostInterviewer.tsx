import { Discipline } from '@internship-app/types';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '.';

type InterviewerToCreate = {
  name: string;
  disciplines: Discipline[];
};

const addInterviewer = async (newInterviewer: InterviewerToCreate) => {
  try {
    await api.post('/interviewer', newInterviewer);
  } catch (err) {
    alert(err);
  }
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
    onError: () => {
      toast.error('Greška prilikom dodavanja intervjuera!');
    },
  });
};
