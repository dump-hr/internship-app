import {
  InternDiscipline,
  InternStatus,
  InternWithStatus,
  InterviewStatus,
} from '@internship-app/types';
import { Button, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'wouter';

import { Path } from '../../constants/paths';
import {
  disciplineStatusChipProps,
  internStatusChipProps,
  interviewChipProps,
  shortDisciplineLabels,
  testChipProps,
} from './consts';

type Props = {
  data: InternWithStatus[] | undefined;
  setSelection?: (selection: string[]) => void;
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

const getInterviewChip = (intern: InternWithStatus) => {
  const props = interviewChipProps[intern.interviewStatus];
  const score = intern.interviewSlot?.score;

  const scoreText = score ? `(${score}b)` : '';

  return (
    <Chip
      {...props}
      label={`${props.label} ${scoreText}`}
      key={intern.id + 'interview'}
    />
  );
};

const InternList: React.FC<Props> = ({ data = [], setSelection }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 0 },
    {
      field: 'name',
      headerName: 'Ime i prezime',
      width: 180,
    },
    {
      field: 'yearOfBirth',
      headerName: 'Godište',
      description: 'Sort - po godištu',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      sortable: false,
      renderCell: (status) => (
        <Chip {...internStatusChipProps[status.value as InternStatus]} />
      ),
    },
    {
      field: 'disciplines',
      headerName: 'Područja',
      description: 'Boja - status, hover; sort - po broju područja',
      width: 240,
      sortComparator: (a, b) => a.length - b.length,
      renderCell: (props: GridRenderCellParams<InternDiscipline[]>) =>
        props.value.map(getDisciplineChip),
    },
    {
      field: 'interviewStatus',
      headerName: 'Intervju',
      description: 'Sort - po broju bodova',
      width: 150,
      sortComparator: (a, b) => a.interviewSlot?.score - b.interviewSlot?.score,
      renderCell: (props: GridRenderCellParams<InternWithStatus>) =>
        getInterviewChip(props.value),
    },
    {
      field: 'testStatus',
      headerName: 'Testovi',
      description: 'Boja - status, hover',
      width: 170,
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
      renderCell: (params) => (
        <Button
          component={Link}
          to={Path.Intern.replace(':internId', params.row.id)}
        >
          Pregledaj
        </Button>
      ),
    },
    {
      field: 'buttonIntervju',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          component={Link}
          disabled={params.value !== InterviewStatus.Pending}
          to={Path.Interview.replace(':internId', params.row.id)}
        >
          Intervju
        </Button>
      ),
    },
  ];

  const rows = data.map((intern) => {
    return {
      id: intern.id,
      name: `${intern.firstName} ${intern.lastName}`,
      yearOfBirth:
        typeof intern.data.dateOfBirth === 'string'
          ? `${new Date(intern.data.dateOfBirth).getFullYear()}.`
          : '-',
      status: intern.status,
      disciplines: intern.internDisciplines,
      interviewStatus: intern,
      testStatus: intern.internDisciplines,
      buttonIntervju: intern.interviewStatus,
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
        onRowSelectionModelChange={(newSelection) => {
          setSelection && setSelection(newSelection as string[]);
        }}
      />
    </div>
  );
};

export default InternList;
