import {
  InternDiscipline,
  InternStatus,
  InternWithStatus,
  InterviewStatus,
} from '@internship-app/types';
import { Button, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'wouter';

import {
  disciplineStatusChipProps,
  internStatusChipProps,
  interviewChipProps,
  shortDisciplineLabels,
  testChipProps,
} from './consts';

type Props = {
  data: InternWithStatus[] | undefined;
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

const UsersList: React.FC<Props> = ({ data = [] }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 0 },
    {
      field: 'name',
      headerName: 'Ime i prezime',
      width: 140,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (status) => (
        <Chip {...internStatusChipProps[status.value as InternStatus]} />
      ),
    },
    {
      field: 'disciplines',
      headerName: 'Područja',
      width: 200,
      sortable: false,
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
      sortable: false,
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
      status: intern.status,
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
        disableColumnFilter
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
