import { useQuery } from 'react-query';

import { api } from '.';

const fetchCount = () => {
  return api.get<never, number>('/counter');
};

export const useFetchCount = () => {
  return useQuery(['count'], fetchCount);
};
