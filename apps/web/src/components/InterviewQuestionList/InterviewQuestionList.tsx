import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { MultistepQuestion } from '@internship-app/types';
import { useFetchAllInterviewQuestions } from '../../api/useFetchAllInterviewQuestions';
import { QuestionCategory } from '../../constants/interviewConstants';
import { Button } from '@mui/material';
import { useSetQuestionAvailability } from '../../api/useSetQuestionAvailability';

const InterviewQuestionList = () => {
  const { data: interviewQuestions = [] } = useFetchAllInterviewQuestions();
  const setQuestionAvailability = useSetQuestionAvailability();

  const toggleAvailability = (params: GridRenderCellParams) => {
    setQuestionAvailability.mutate({
      questionId: params.row.id,
      isEnabled: !params.row.isEnabled,
    });
  };

  const rows = interviewQuestions.map(
    (question: MultistepQuestion<QuestionCategory>) => ({
      id: question.id,
      title: question.title,
      type: question.type,
      category: question.category,
      isEnabled: question.isEnabled,
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
            }}
          >
            <Button onClick={() => toggleAvailability(params)}>
              {params.row.isEnabled ? 'DISABLE' : 'ENABLE'}
            </Button>
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
