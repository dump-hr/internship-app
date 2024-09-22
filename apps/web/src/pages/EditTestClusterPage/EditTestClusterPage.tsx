import { useRoute } from 'wouter';
import { useFetchTestCluster } from '../../api/useFetchTestCluster';
import { Path } from '../../constants/paths';
import AdminPage from '../../components/AdminPage';
import TestCaseClusterForm from '../../components/TestClusterForm';
import { useFetchAllQuestions } from '../../api/useFetchAllQuestions';

export const EditTestClusterPage = () => {
  const [, params] = useRoute(Path.EditTestCluster);
  const testClusterId = params?.testClusterId;
  console.log(testClusterId);
  const { data, isLoading } = useFetchTestCluster(testClusterId || '');
  const { data: questions, isLoading: isLoadingQuestions } =
    useFetchAllQuestions();

  if (isLoading || isLoadingQuestions) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Test cluster not found</div>;
  }

  return (
    <AdminPage>
      <h1>Edit Test Cluster</h1>
      <TestCaseClusterForm
        previousValues={data}
        testQuestions={questions || []}
        onSubmitted={() => {}}
      />
    </AdminPage>
  );
};
