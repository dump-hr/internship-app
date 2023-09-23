import { DisciplineStatus, Intern, TestStatus } from '@internship-app/types';
import { Button, Chip, ChipProps } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'wouter';

type Props = {
  data: Intern[] | undefined;
};

enum InternStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

enum InterviewStatus {
  NoRight = 'NoRight',
  PickTerm = 'PickTerm',
  Pending = 'Pending',
  Done = 'Done',
  Missed = 'Missed',
}

const statusChips: Record<InternStatus, ChipProps> = {
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

const interviewChips: Record<InterviewStatus, ChipProps> = {
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

const getInterviewStatus = (intern: Intern) => {
  if (!intern.hasInterviewRight) return InterviewStatus.NoRight;

  if (!intern.interviewSlot) return InterviewStatus.PickTerm;

  return intern.interviewSlot.status as InterviewStatus;
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
        <Chip {...statusChips[status.value as InternStatus]} />
      ),
    },
    { field: 'disciplines', headerName: 'Područja', width: 130 },
    {
      field: 'interviewStatus',
      headerName: 'Intervju',
      width: 150,
      sortable: false,
      renderCell: (status) => (
        <Chip {...interviewChips[status.value as InterviewStatus]} />
      ),
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
      disciplines: intern.internDisciplines
        .sort((ind) => ind.priority)
        .map((ind) => ind.discipline),
      interviewStatus: getInterviewStatus(intern),
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
