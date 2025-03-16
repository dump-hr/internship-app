import { Link, useRoute } from 'wouter';
import { Path } from '../../constants/paths';
import { useFetchInterviewQuestionAnswers } from '../../api/useFetchInterviewQuestionAnswers';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import AdminPage from '../../components/AdminPage';
import { useSetAnswerFlag } from '../../api/useSetAnwerFlag';
import { SetAnswerFlagRequest } from '@internship-app/types';

const flaggedRowStyle = {
  backgroundColor: 'rgba(255, 0, 0, 0.3)',
};

const InterviewQuestionStats = () => {
  const [, params] = useRoute(Path.QuestionStats);
  const questionId = params?.questionId;
  const setAnswerFlag = useSetAnswerFlag();

  const { data: answers } = useFetchInterviewQuestionAnswers(questionId || '');

  if (!answers) return <h1>Loading...</h1>;
  if (answers.length < 1) return <h1>No answers to this question</h1>;

  const handleAnswerFlag = (params: GridRenderCellParams) => {
    const answer = answers.find((a) => a.intern.id === params.row.id);

    const firstAnswerElement = Array.isArray(answer?.answer)
      ? answer?.answer[0]
      : null;

    const request: SetAnswerFlagRequest = {
      slotId: answer?.slotId || '',
      questionId: firstAnswerElement.id || '',
    };
    setAnswerFlag.mutate(request);
  };

  const rows = answers.map((item) => {
    const answer = Array.isArray(item.answer) ? item.answer[0] : null;
    return {
      id: item.intern.id,
      fullName: item.intern.firstName.concat(' ', item.intern.lastName),
      value: answer.value,
      isFlaged: answer.isFlaged || false,
      question: answer.title,
    };
  });

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Ime i prezime', width: 150 },
    {
      field: 'question',
      headerName: 'Pitanje',
      width: 400,
      renderCell: (params) => (
        <Typography
          style={{
            overflowX: 'hidden',
            whiteSpace: 'normal',
            maxHeight: '6em',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'value',
      headerName: 'Odgovor',
      width: 275,
      renderCell: (params) => (
        <Typography
          style={{
            overflowX: 'hidden',
            whiteSpace: 'normal',
            maxHeight: '6em',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      width: 210,
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
          getRowHeight={() => 100}
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
