import { api } from '@api/index';
import { InterviewMemberParticipation } from '@prisma/client';
import { useQuery } from 'react-query';

const fetchAllInterviewMemberParticipations = async () => {
  return api.get<never, InterviewMemberParticipation[]>(
    `/interviewer/participations`,
  );
};

export const useFetchInterviewMemberParticipations = () => {
  return useQuery(
    ['interviewer-participations'],
    fetchAllInterviewMemberParticipations,
  );
};
