import { Discipline } from '@internship-app/types';
import { useMutation } from 'react-query';

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
  return useMutation({
    mutationFn: addInterviewer,
    mutationKey: ['timesSubmitted'],
  });
};
