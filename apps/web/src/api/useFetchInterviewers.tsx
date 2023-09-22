import { Interviewer } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchInterviewers = async () => {
  return api.get<never, Interviewer[]>('/interviewers');
};

const fetchInterviewersByDiscipline = async (discipline: string) => {
  return api.get<never, Interviewer[]>(
    `/interviewers/get-by-discipline/${discipline}`,
  );
};

export const useFetchInterviewersByDiscipline = (discipline: string) => {
  return useQuery(['interviewers', discipline], () => {
    if (discipline.length === 0) {
      return fetchInterviewers();
    } else {
      return fetchInterviewersByDiscipline(discipline);
    }
  });
};
