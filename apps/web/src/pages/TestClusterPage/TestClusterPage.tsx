import { useFetchTestClusters } from '../../api/useF etchAllTestClusters';
import AdminPage from '../../components/AdminPage';
import TestClusterList from '../TestCluster/TestClusterList';
import { Button } from '@mui/material';
import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { Link } from 'wouter';
import { Path } from '../../constants/paths';

export const TestClusterPage = () => {
  useMsalAuthentication(InteractionType.Redirect);

  const { data, isLoading } = useFetchTestClusters();

  return (
    <AdminPage headerText="Test Clusters">
      {isLoading ? 'Loading...' : <TestClusterList testClusters={data || []} />}

      <Button component={Link} to={Path.TestClusterCreate}>
        Create new Test Cluster
      </Button>
    </AdminPage>
  );
};
