import { Interviewer } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchInterviewers = async () => {
  return api.get<never, Interviewer[]>('/interviewers');
};

export const useFetchInterviewers = () => {
  return useQuery(['interviewers'], fetchInterviewers);
};
