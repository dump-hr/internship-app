import { InterviewerWithStats } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllInterviewers = async () => {
  return api.get<never, InterviewerWithStats[]>('/interviewer');
};

export const useFetchAllInterviewers = () => {
  return useQuery(['interviewer'], fetchAllInterviewers);
};
