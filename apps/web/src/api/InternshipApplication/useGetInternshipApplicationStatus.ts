import { useQuery } from 'react-query';

export const useGetInternshipApplicationStatus = () => {
  return useQuery({
    queryKey: ['internship-application-status'],
  });
};
