import { TestCluster } from '@internship-app/types';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'wouter';

export interface TestClusterListProps {
  testClusters: TestCluster[];
}

const TestClusterList = ({ testClusters }: TestClusterListProps) => {
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
    { field: 'isSample', headerName: 'Is Sample', width: 150 },
    {
      field: 'buttonEdit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            component={Link}
            onClick={() => {
              console.log(params.row.id);
            }}
            to={`/test-cluster/${params.row.id}`}
          >
            Edit
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
        checkboxSelection
      />
    </div>
  );
};

export default TestClusterList;
