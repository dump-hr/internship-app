import { api } from '@api/base';
import { useQuery } from 'react-query';

interface OldInternResult {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  discipline?: string | null;
  test_score?: number | null;
  interview_score?: number | null;
}

interface FindDto {
  name?: string;
  surname?: string;
  email?: string;
}

const fetchOldInternData = (params: FindDto) => {
  return api.get<FindDto, OldInternResult>('/old-intern-result', { params });
};
export const useFetchOldInternData = () => {
  return useQuery({
    queryFn: () => fetchOldInternData,
    queryKey: ['old-intern-data'],
  });
};
