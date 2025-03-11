import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MultistepQuestion } from '@internship-app/types';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';
import { QuestionCategory } from '../../constants/interviewConstants';
import { Button } from '@mui/material';

const InterviewQuestionList = () => {
  const { data: interviewQuestions = [] } = useFetchAllInterviewQuestions();

  const rows = interviewQuestions.map(
    (question: MultistepQuestion<QuestionCategory>) => ({
      id: question.id,
      title: question.title,
      type: question.type,
      category: question.category,
    }),
  );

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Question',
      width: 700,
      renderCell: (params) => (
        <div
          style={{
            overflowX: 'hidden',
            whiteSpace: 'normal',
            maxHeight: '4em',
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'category', headerName: 'Category', width: 120 },
    {
      field: 'actions',
      headerName: '',
      width: 300,
      sortable: false,
      align: 'right',
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            <Button>DISABLE</Button>
            <Button>EDIT</Button>
            <Button>STATS</Button>
          </div>
        );
      },
    },
  ];

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
        getRowHeight={() => 80}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default InterviewQuestionList;
