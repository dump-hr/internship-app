import { api } from '@api/base';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

const changeInternshipApplicationStatus = (newStatus: boolean) => {
  return api.patch<boolean, never>('/internship-application-status/update', {
    isOpened: newStatus,
  });
};

export const useChangeInternshipApplicationStatus = () => {
  return useMutation({
    mutationKey: ['internship-application-status'],
    mutationFn: changeInternshipApplicationStatus,
    onSuccess: () => {
      toast.success('Uspješno promijenjen status prijava');
    },
  });
};
