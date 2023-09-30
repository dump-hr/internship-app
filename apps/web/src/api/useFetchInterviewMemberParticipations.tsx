import { InterviewMemberParticipation } from '@prisma/client';
import { useQuery } from 'react-query';

import { api } from '.';

const fetchAllInterviewMemberParticipations = async () => {
  return api.get<never, InterviewMemberParticipation[]>(
    `/interview-member-participation`,
  );
};

export const useFetchInterviewMemberParticipations = () => {
  return useQuery(
    ['interview-member-participation'],
    fetchAllInterviewMemberParticipations,
  );
};
