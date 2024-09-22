import { CreateTestClusterDto } from '@internship-app/types';
import { api } from '.';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

interface FullData {
  id: string;
  data: Partial<CreateTestClusterDto>;
}

export const updateTestCluster = (fullData: FullData) =>
  api.put<Partial<CreateTestClusterDto>>(
    `/test-cluster/${fullData.id}`,
    fullData.data,
  );

export const useUpdateTestCluster = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTestCluster, {
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries(['test-cluster', variables.id]);
      toast.success('Test cluster updated successfully');
    },
    onError: (error: string) => {
      console.log('error updating test cluster: ', error);
      toast.error('Error updating test cluster');
    },
  });
};
