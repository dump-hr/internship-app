import { TestCluster } from '@internship-app/types';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TestClusterQuestionOption } from '../../components/TestClusterForm/TestClusterForm';
import { Link } from 'wouter';
import { Path } from '../../constants/paths';
import { useDeleteTestCluster } from '../../api/useDeleteTestCluster';

export interface TestClusterListProps {
  testClusters: TestCluster[];
  testQuestions?: TestClusterQuestionOption[];
}

const TestClusterList = ({ testClusters }: TestClusterListProps) => {
  const { mutateAsync } = useDeleteTestCluster();

  const handleDeleteTestCluster = async (id: string) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this test cluster?',
    );
    if (!confirmation) return; // Potential TODO: if anybody wants to implement a confirmation modal they are free to do so

    await mutateAsync(id);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 0 },
    { field: 'maxExecutionTime', headerName: 'Max Execution Time', width: 150 },
    { field: 'maxMemory', headerName: 'Max Memory', width: 150 },
    { field: 'points', headerName: 'Points', width: 150 },
    {
      field: 'testQuestionTitle',
      headerName: 'Test Question Title',
      width: 150,
    },
    { field: 'isSample', headerName: 'Is Sample', width: 350 },
    {
      field: 'buttonEdit',
      renderHeader: () => <></>,
      width: 100,
      renderCell: (params) => {
        return (
          <Button
            component={Link}
            to={Path.EditTestCluster.replace(':testClusterId', params.row.id)}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: 'buttonDelete',
      renderHeader: () => <></>,
      width: 100,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteTestCluster(params.row.id as string)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const rows = testClusters.map((testCluster) => {
    return {
      id: testCluster.id,
      maxExecutionTime: testCluster.maxExecutionTime,
      maxMemory: testCluster.maxMemory,
      points: testCluster.points,
      testQuestionTitle: testCluster.testQuestionTitle,
      isSample: testCluster.isSample,
    };
  });

  return (
    <div
      style={{
        width: '100%',
        marginTop: '30px',
        marginBottom: '100px',
      }}
    >
      <DataGrid
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        rows={rows}
        columns={columns}
        disableColumnFilter
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default TestClusterList;
