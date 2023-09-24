import { useMutation } from 'react-query';

import { api } from '.';

const deleteInterviewer = async (id: string) => {
  return api.delete(`/interviewer/${id}`);
};

export const useDeleteInterviewer = () => {
  return useMutation({ mutationFn: deleteInterviewer });
};
