import { InternQuestionAnswer } from '@internship-app/types';
import { useQuery } from 'react-query';

import { api } from '@api/base';

const fetchTestAnswers = async (
  testSlotId: string,
  group: string,
  groupId: string,
) => {
  return await api.get<never, InternQuestionAnswer[]>(
    `/test-slot/answers/${testSlotId}/${group}/${groupId}`,
  );
};

export const useFetchTestAnswers = (
  group?: string,
  groupdId?: string,
  testSlotId?: string,
) => {
  return useQuery(
    ['test-answers', testSlotId, group, groupdId],
    () => fetchTestAnswers(testSlotId!, group!, groupdId!),
    {
      enabled: !!group && !!groupdId && !!testSlotId,
      staleTime: Infinity,
      retry: false,
    },
  );
};
