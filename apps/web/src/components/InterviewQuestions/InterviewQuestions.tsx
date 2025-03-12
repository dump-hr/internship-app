import { Box, Button } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

import { useFetchAllInterviewQuestions } from '../../api/usefetchAllInterviewQuestions.tsx';

export const InterviewQuestions = () => {
  const { data: allQuestions } = useFetchAllInterviewQuestions();

  const columns = [
    {
      field: 'question',
      headerName: 'Interview Question',
      flex: 1,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      editable: true,
    },
    {
      field: 'Actions',
      HeaderName: 'Actions',
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={'contained'}
            size={'small'}
            onClick={() => console.log(params.id)}
          >
            Edit
          </Button>
          <Button
            variant={'contained'}
            size={'small'}
            onClick={() => console.log(params.id)}
          >
            Disable
          </Button>
        </Box>
      ),
      editable: false,
    },
    {
      field: 'stats',
      headerName: 'Stats',
      flex: 1,
      editable: false,
      renderCell: (params: GridCellParams) => (
        <Button
          variant={'outlined'}
          size={'small'}
          onClick={() => console.log(params.id)}
        >
          Stats
        </Button>
      ),
    },
  ];

  if (!allQuestions) return <div>Loading...</div>;

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Button variant={'outlined'} sx={{ margin: '30px 0' }}>
        Add new question
      </Button>
      <DataGrid
        columns={columns}
        rows={allQuestions}
        pageSizeOptions={[10, 20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        autoHeight={true}
      />
    </Box>
  );
};
