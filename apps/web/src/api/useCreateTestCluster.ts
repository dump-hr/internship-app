import { CreateTestClusterDto } from '@internship-app/types';
import { api } from '.';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

export const createTestCluster = (data: CreateTestClusterDto) =>
  api.post<CreateTestClusterDto, never>('/test-cluster', data);

export const useCreateTestCluster = () => {
  const queryClient = useQueryClient();

  return useMutation(createTestCluster, {
    onMutate: () => {
      toast.loading('Creating test cluster...');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries(['test-cluster']);
      toast.success('Test cluster created successfully');
    },
    onError: (error: string) => {
      console.log('error creating test cluster: ', error);
      toast.error('Error creating test cluster');
    },
  });
};
