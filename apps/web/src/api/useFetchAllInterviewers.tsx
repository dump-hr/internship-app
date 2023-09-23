/*
import { InterviewSlot } from '@prisma/client';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchALllInterviewSlots = async () => {
  return api.get<never, InterviewSlot[]>('/interview-slot');
};

export const useFetchAllInterviewSlots = () => {
  return useQuery(['interview-slot'], fetchALllInterviewSlots);
};
*/

import { Interviewer } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllInterviewers = async () => {
  return api.get<never, Interviewer[]>('/interviewer');
};

export const useFetchAllInterviewers = () => {
  return useQuery(['interviewer'], fetchAllInterviewers);
};
