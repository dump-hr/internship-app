import {
  Discipline,
  DisciplineStatus,
  Intern,
  InternDiscipline,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';
import { Button, Chip, ChipProps } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'wouter';

type Props = {
  data: Intern[] | undefined;
};

enum InternStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

const shortDisciplineLabels = {
  [Discipline.Development]: 'Dev',
  [Discipline.Design]: 'Diz',
  [Discipline.Marketing]: 'Mark',
  [Discipline.Multimedia]: 'Mult',
};

const disciplineStatusChipProps: Record<InternStatus, ChipProps> = {
  [DisciplineStatus.Pending]: {
    color: 'info',
    title: 'Status područja još nije određen',
  },
  [DisciplineStatus.Rejected]: {
    color: 'error',
    title: 'Intern nije prihvaćen u područje',
  },
  [DisciplineStatus.Approved]: {
    color: 'success',
    title: 'Intern je prihvaćen u područje',
  },
};

const statusChipProps: Record<InternStatus, ChipProps> = {
  [InternStatus.Pending]: {
    label: 'Čekanje',
    color: 'info',
    title: 'Status interna još nije određen',
  },
  [InternStatus.Rejected]: {
    label: 'Odbijen',
    color: 'error',
    title: 'Intern nije prihvaćen ni u jedno područje',
  },
  [InternStatus.Approved]: {
    label: 'Prihvaćen',
    color: 'success',
    title: 'Intern je prihvaćen bar u jedno područje',
  },
};

const interviewChipProps: Record<InterviewStatus, ChipProps> = {
  [InterviewStatus.NoRight]: {
    label: 'Obespravljen',
    color: 'warning',
    title: 'Nema pravo na intervju',
  },
  [InterviewStatus.PickTerm]: {
    label: 'Bira termin',
    color: 'primary',
    title: 'U procesu odabira termina',
  },
  [InterviewStatus.Pending]: {
    label: 'Čekanje',
    color: 'info',
    title: 'Termin odabran i čeka',
  },
  [InterviewStatus.Done]: {
    label: 'Odrađen',
    color: 'success',
    title: 'Intervju odrađen',
  },
  [InterviewStatus.Missed]: {
    label: 'Propušten',
    color: 'error',
    title: 'Intervju propušten',
  },
};

const testChipProps: Record<TestStatus, ChipProps> = {
  [TestStatus.PickTerm]: {
    color: 'primary',
    title: 'U procesu odabira termina',
  },
  [TestStatus.Pending]: {
    color: 'info',
    title: 'Termin odabran i čeka',
  },
  [InterviewStatus.Done]: {
    color: 'success',
    title: 'Test odrađen (ne nužno i položen)',
  },
  [InterviewStatus.Missed]: {
    color: 'error',
    title: 'Test propušten',
  },
};

const getDisciplineChip = (internDiscipline: InternDiscipline) => {
  const { discipline, status } = internDiscipline;

  return (
    <Chip
      label={shortDisciplineLabels[discipline]}
      {...disciplineStatusChipProps[status]}
      key={internDiscipline.internId + discipline}
    />
  );
};

const getTestChip = (internDiscipline: InternDiscipline) => {
  const { discipline, testStatus, testScore } = internDiscipline;
  if (!testStatus) return null;

  const scoreText = testScore ? `(${testScore}b)` : '';
  const label = shortDisciplineLabels[discipline];

  return (
    <Chip
      label={`${label} ${scoreText}`}
      {...testChipProps[testStatus]}
      key={internDiscipline.internId + discipline}
    />
  );
};

const getInternStatus = (intern: Intern) => {
  if (
    intern.internDisciplines.some(
      (ind) => ind.status === DisciplineStatus.Pending,
    )
  )
    return InternStatus.Pending;

  if (
    intern.internDisciplines.some(
      (ind) => ind.status === DisciplineStatus.Approved,
    )
  )
    return InternStatus.Approved;

  return InternStatus.Rejected;
};

const UsersList: React.FC<Props> = ({ data = [] }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 0 },
    { field: 'name', headerName: 'Ime i prezime', width: 140 },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (status) => (
        <Chip {...statusChipProps[status.value as InternStatus]} />
      ),
    },
    {
      field: 'disciplines',
      headerName: 'Područja',
      width: 200,
      renderCell: (
        internDisciplines: GridRenderCellParams<InternDiscipline[]>,
      ) => <>{internDisciplines.value.map(getDisciplineChip)}</>,
    },
    {
      field: 'interviewStatus',
      headerName: 'Intervju',
      width: 150,
      renderCell: (status) => (
        <Chip {...interviewChipProps[status.value as InterviewStatus]} />
      ),
    },
    {
      field: 'testStatus',
      headerName: 'Testovi',
      width: 150,
      renderCell: (
        internDisciplines: GridRenderCellParams<InternDiscipline[]>,
      ) => <>{internDisciplines.value.map(getTestChip)}</>,
    },
    {
      field: 'buttonPregledaj',
      headerName: '',
      width: 110,
      sortable: false,
      renderCell: () => <Button disabled>Pregledaj</Button>,
    },
    {
      field: 'buttonIntervju',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button component={Link} to={`/interview/${params.row.id}`}>
          Intervju
        </Button>
      ),
    },
  ];

  const rows = data.map((intern) => {
    return {
      id: intern.id,
      name: `${intern.firstName} ${intern.lastName}`,
      status: getInternStatus(intern),
      disciplines: intern.internDisciplines.sort((ind) => ind.priority),
      interviewStatus: intern.interviewStatus,
      testStatus: intern.internDisciplines,
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
        rows={rows}
        columns={columns}
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
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default UsersList;
