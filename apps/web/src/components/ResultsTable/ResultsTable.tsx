import { ResultSummary } from '@internship-app/types';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import EvaluationModal from '../EvaluationModal';

export interface ResultsTableProps {
  results: ResultSummary[];
}

export const ResultsTable = ({ results }: ResultsTableProps) => {
  const [currentlyOpenModal, setCurrentlyOpenModal] = useState<string | null>(
    null,
  );

  const columns: GridColDef[] = [
    { field: 'dateOfSubmission', headerName: 'Time of submission', width: 150 },
    {
      field: 'isAccepted',
      headerName: 'Answer Accepted',
      width: 150,
      renderCell: (params) => (params.value ? 'Yes' : 'No'),
    },
    {
      field: 'score',
      headerName: 'Score',
      width: 150,
      renderCell: (params) =>
        params.value ? `${params.value} points` : 'Not graded',
    },
    {
      field: 'maxScore',
      headerName: 'Max Score',
      width: 150,
      renderCell: (params) => `${params.value} points`,
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => downloadTxtFile(params.value)} color="primary">
          Download code
        </Button>
      ),
    },
  ];

  const rows = results.map((result) => ({
    id: result.id,
    dateOfSubmission: result.dateOfSubmission,
    isAccepted: result.isAccepted,
    score: result.score,
    maxScore: result.maxPoints,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(params) => setCurrentlyOpenModal(params.id.toString())}
      />
      {results.map((result) => (
        <EvaluationModal
          isOpen={currentlyOpenModal === result.id}
          answerId={result.id}
        />
      ))}
    </div>
  );
};
