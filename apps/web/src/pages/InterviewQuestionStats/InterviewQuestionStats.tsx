import { Link, useRoute } from 'wouter';
import { Path } from '../../constants/paths';
import { useFetchInterviewQuestionAnswers } from '../../api/useFetchInterviewQuestionAnswers';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import AdminPage from '../../components/AdminPage';

const InterviewQuestionStats = () => {
  const [, params] = useRoute(Path.QuestionStats);
  const questionId = params?.questionId;

  if (!questionId) return <p>Invalid question Id</p>;

  const { data: answers } = useFetchInterviewQuestionAnswers(questionId);

  if (!answers) return;

  console.log(answers);

  const rows = answers.map((item) => ({
    id: item.intern.id,
    fullName: item.intern.firstName.concat(' ', item.intern.lastName),
    value: item.answer.value,
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
            <Button>FLAG</Button>
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
        {answers[0].answer.title}
      </Typography>{' '}
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
        />
      </div>
    </AdminPage>
  );
};

export default InterviewQuestionStats;
