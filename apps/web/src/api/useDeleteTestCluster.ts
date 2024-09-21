import toast from 'react-hot-toast';
import { api } from '.';
import { useMutation, useQueryClient } from 'react-query';

const removeTestCluster = (id: string) => api.delete(`/test-cluster/${id}`);

export const useDeleteTestCluster = () => {
  const queryClient = useQueryClient();

  return useMutation(removeTestCluster, {
    onMutate: () => {
      toast.loading('Deleting test cluster...');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(['test-cluster']);
      toast.success('Test cluster deleted successfully');
    },
    onError: (error: string) => {
      console.log('error deleting test cluster: ', error);
      toast.error('Error deleting test cluster');
    },
  });
};
