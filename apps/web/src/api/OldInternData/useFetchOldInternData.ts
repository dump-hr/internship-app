import { api } from '@api/base';
import { useQuery } from 'react-query';

interface OldInternResult {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  applicationYear: Date;
  discipline?: string | null;
  test_score?: number | null;
  interview_score?: number | null;
}

interface FindDto {
  name: string;
  surname: string;
  email: string;
}

const fetchOldInternData = (params: FindDto) => {
  const response = api.get<FindDto, OldInternResult[]>('/old-intern-result', {
    params,
  });

  return response;
};
export const useFetchOldInternData = (params: FindDto) => {
  return useQuery({
    queryFn: () => fetchOldInternData(params),
    queryKey: ['old-intern-data'],
  });
};
