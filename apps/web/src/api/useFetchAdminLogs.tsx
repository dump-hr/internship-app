import type { AdminLogsDto, GetAdminLogsRequest } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '@api/index';

const fetchAdminLogs = async (req: GetAdminLogsRequest) => {
  return api.get<never, AdminLogsDto>('/logger/admin', { params: req });
};

export const useFetchAdminLogs = (req: GetAdminLogsRequest) => {
  return useQuery(['admin-log', req], () => fetchAdminLogs(req));
};
