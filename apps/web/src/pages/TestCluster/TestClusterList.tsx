import { TestCluster } from '@internship-app/types';
import { Button, Modal } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  TestCaseClusterForm,
  TestClusterQuestionOption,
} from '../../components/TestClusterForm/TestClusterForm';
import { useState } from 'react';

export interface TestClusterListProps {
  testClusters: TestCluster[];
  testQuestions?: TestClusterQuestionOption[];
}

const TestClusterList = ({ testClusters }: TestClusterListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 0 },
    { field: 'maxExecutionTime', headerName: 'Max Execution Time', width: 150 },
    { field: 'maxMemory', headerName: 'Max Memory', width: 150 },
    { field: 'points', headerName: 'Points', width: 150 },
    { field: 'testQuestionId', headerName: 'Test Question ID', width: 0 },
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
          <>
            <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <TestCaseClusterForm
                testQuestions={[]}
                previousValues={{
                  id: params.row.id,
                  maxExecutionTime: params.row.maxExecutionTime,
                  maxMemory: params.row.maxMemory,
                  points: params.row.points,
                  testQuestionId: params.row.testQuestionId,
                  testQuestionTitle: params.row.testQuestionTitle,
                  testCases: [], // Crucial TODO: see if this works, if I decide on page instead do a quick reoroute
                  isSample: params.row.isSample,
                }}
              />
            </Modal>
          </>
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
