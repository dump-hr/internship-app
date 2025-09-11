import { api } from '@api/base';
import { useQuery } from 'react-query';

interface ApplicationStatus {
  id: number;
  isOpened: boolean;
}

const getInternshipApplicationsStatus = async () => {
  const res = await api.get<never, ApplicationStatus>(
    '/internship-application-status/isOpened',
  );

  return res.isOpened;
};

export const useGetInternshipApplicationStatus = () => {
  return useQuery({
    queryKey: ['internship-application-status'],
    queryFn: getInternshipApplicationsStatus,
  });
};
