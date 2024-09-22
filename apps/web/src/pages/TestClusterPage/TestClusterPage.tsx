import { useFetchTestClusters } from '../../api/useF etchAllTestClusters';
import AdminPage from '../../components/AdminPage';
import TestClusterList from '../TestCluster/TestClusterList';

export const TestClusterPage = () => {
  const { data, isLoading } = useFetchTestClusters();

  return (
    <AdminPage headerText="Test Clusters">
      {isLoading ? 'Loading...' : <TestClusterList testClusters={data || []} />}
    </AdminPage>
  );
};
