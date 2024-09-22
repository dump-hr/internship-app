import { useFetchAllQuestions } from '../../api/useFetchAllQuestions';
import AdminPage from '../../components/AdminPage';
import TestCaseClusterForm from '../../components/TestClusterForm';

export const CreateTestClusterPage = () => {
  const { data, isLoading } = useFetchAllQuestions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminPage>
      <h1>Create Test Cluster</h1>
      <TestCaseClusterForm testQuestions={data || []} />
    </AdminPage>
  );
};
