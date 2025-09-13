import { api } from '@api/base';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

const changeInternshipApplicationStatus = (newStatus: boolean) => {
  return api.patch<boolean, never>('/internship-application-status/update', {
    isOpened: newStatus,
  });
};

export const useChangeInternshipApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['internship-application-status'],
    mutationFn: changeInternshipApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['internship-application-status']);
      toast.success('Uspješno promijenjen status prijava');
    },
    onError: (error: string) => {
      toast.error(`Pogreška prilikom mijenjanja statusa prijava: ${error}`);
    },
  });
};
