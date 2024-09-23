import {
  CompleteEvaluationResult,
  EvaluateTestCaseResultAdmin,
  TestCaseResult,
} from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface TestCaseTableProps {
  result: CompleteEvaluationResult;
  index?: number;
}

const colorMap: Record<TestCaseResult, string> = {
  AcceptedAnswer: 'green',
  WrongAnswer: 'red',
  TimeLimitExceeded: 'yellow',
  MemoryLimitExceeded: 'orange',
  RuntimeError: 'purple',
};

export const TestCaseTable = ({ result, index }: TestCaseTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'evaluationStatus',
      headerName: 'Evaluation Status',
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: colorMap[params.value as TestCaseResult],
            width: '100%',
            height: '100%',
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: 'executionTime',
      headerName: 'Execution Time',
      width: 150,
    },
    {
      field: 'memoryUsed',
      headerName: 'Memory Used',
      width: 150,
    },
    {
      field: 'error',
      headerName: 'Error',
      width: 150,
    },
    {
      field: 'input',
      headerName: 'Input',
      width: 150,
      renderCell: (params) => (
        <Box>
          {result.isSample ? (
            'Tijekom testa nemate pristup'
          ) : (
            <Button onClick={() => downloadTxtFile(params.value)}>
              Download
            </Button>
          )}
        </Box>
      ),
    },
    {
      field: 'expectedOutput',
      headerName: 'Expected Output',
      width: 150,
      renderCell: (params) => (
        <Box>
          {result.isSample ? (
            'Tijekom testa nemate pristup'
          ) : (
            <Button onClick={() => downloadTxtFile(params.value)}>
              Download
            </Button>
          )}
        </Box>
      ),
    },
    {
      field: 'userOutput',
      headerName: 'User Output',
      width: 150,
      renderCell: (params) => (
        <Box>
          {result.isSample ? (
            'Tijekom testa nemate pristup'
          ) : (
            <Button onClick={() => downloadTxtFile(params.value)}>
              Download
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const rows = result.testCases.map((testCase, index) => {
    return {
      id: index,
      evaluationStatus: testCase.evaluationStatus,
      executionTime: testCase.executionTime,
      memoryUsed: testCase.memoryUsed,
      error: testCase.error,
      ...(result.isSample && {
        input: (testCase as EvaluateTestCaseResultAdmin).input,
        expectedOutput: (testCase as EvaluateTestCaseResultAdmin)
          .expectedOutput,
        userOutput: (testCase as EvaluateTestCaseResultAdmin).userOutput,
      }),
    };
  });

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h6">
        Test Case Results (#{index || 0 + 1})
      </Typography>
      <Typography>{result.isAccepted ? 'Accepted' : 'Not Accepted'}</Typography>
      <Typography>
        {result.score} / {result.maxPoints}
      </Typography>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};
