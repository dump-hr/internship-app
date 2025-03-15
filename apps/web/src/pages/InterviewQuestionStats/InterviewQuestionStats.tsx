import { Link, useRoute } from 'wouter';
import { Path } from '../../constants/paths';
import { useFetchInterviewQuestionAnswers } from '../../api/useFetchInterviewQuestionAnswers';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import AdminPage from '../../components/AdminPage';
import { useSetAnswerFlag } from '../../api/useSetAnwerFlag';
import { SetAnswerFlagRequest } from '@internship-app/types';

const flaggedRowStyle = {
  backgroundColor: 'red',
};

const InterviewQuestionStats = () => {
  const [, params] = useRoute(Path.QuestionStats);
  const questionId = params?.questionId;
  const setAnswerFlag = useSetAnswerFlag();

  if (!questionId) return <h1>Question not found</h1>;
  const { data: answers } = useFetchInterviewQuestionAnswers(questionId);

  const filteredAnswers = answers?.filter((a) => a.answer && a.answer.value);
  if (!filteredAnswers) return <h1>Loading...</h1>;

  if (filteredAnswers.length < 1) return <h1>No answers to this question</h1>;

  const handleAnswerFlag = (params: GridRenderCellParams) => {
    const answer = filteredAnswers.find((a) => a.intern.id === params.row.id);
    const request: SetAnswerFlagRequest = {
      slotId: answer.slotId,
      questionId: answer.answer.id,
    };
    setAnswerFlag.mutate(request);
  };

  const rows = filteredAnswers.map((item) => ({
    id: item.intern.id,
    fullName: item.intern.firstName.concat(' ', item.intern.lastName),
    value: item.answer.value,
    isFlaged: item.answer.isFlaged || false,
  }));

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Ime i prezime', width: 150 },
    {
      field: 'value',
      headerName: 'Odgovor',
      width: 500,
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
    {
      field: 'actions',
      headerName: '',
      width: 285,
      sortable: false,
      align: 'right',
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
            }}
          >
            <Button onClick={() => handleAnswerFlag(params)}>FLAG</Button>
            <Button
              component={Link}
              to={Path.Intern.replace(':internId', params.row.id)}
            >
              UDI U PRIPRAVNIKA
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <AdminPage>
      <Typography
        style={{
          fontSize: '2rem',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {filteredAnswers[0].answer.title}
      </Typography>
      <div
        style={{
          width: '80%',
          justifySelf: 'center',
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
              paginationModel: { page: 0, pageSize: 5 },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params.row.isFlaged ? 'flagged-row' : ''
          }
          sx={{
            '& .flagged-row': flaggedRowStyle,
          }}
        />
      </div>
    </AdminPage>
  );
};

export default InterviewQuestionStats;
