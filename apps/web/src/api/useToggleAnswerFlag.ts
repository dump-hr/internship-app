import { useMutation } from 'react-query';

export const useToggleAnswerFlag = () => {
  return useMutation((answerId: string) =>
    fetch(`/api/interview-questions/answers/${answerId}/flag`, {
      method: 'PATCH',
    }),
  );
};
