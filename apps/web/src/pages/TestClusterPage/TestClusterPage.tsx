import { useState } from 'react';
import { useFetchTestClusters } from '../../api/useF etchAllTestClusters';
import { useFetchAllQuestions } from '../../api/useFetchAllQuestions';
import AdminPage from '../../components/AdminPage';
import TestClusterList from '../TestCluster/TestClusterList';
import { Button, Modal } from '@mui/material';
import TestCaseClusterForm from '../../components/TestClusterForm';
import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';

export const TestClusterPage = () => {
  useMsalAuthentication(InteractionType.Redirect);
  
  const { data, isLoading } = useFetchTestClusters();
  const { data: questions } = useFetchAllQuestions();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <AdminPage headerText="Test Clusters">
      {isLoading ? 'Loading...' : <TestClusterList testClusters={data || []} />}

      <Button onClick={handleModalOpen}>Create test cluster</Button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <TestCaseClusterForm
          testQuestions={questions || []}
          onSubmitted={handleModalClose}
        />
      </Modal>
    </AdminPage>
  );
};
