import {
  Discipline,
  DisciplineStatus,
  Intern,
  InternDiscipline,
  InterviewStatus,
} from '@internship-app/types';
import { Button, Chip, TextField } from '@mui/material';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridFilterInputValueProps,
  GridFilterItem,
  GridRenderCellParams,
  GridTreeNode,
} from '@mui/x-data-grid';
import { Link } from 'wouter';

import FilterSingleSelect from '../FilterSingleSelect/FilterSingleSelect';
import {
  disciplineStatusChipProps,
  InternStatus,
  internStatusChipProps,
  interviewChipProps,
  shortDisciplineLabels,
  testChipProps,
} from './consts';

type Props = {
  data: Intern[] | undefined;
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
      filterOperators: [
        {
          value: 'contains',
          getApplyFilterFn: (filterItem) => {
            if (filterItem.value == null || filterItem.value === '') {
              return null;
            }

            return ({ value }) =>
              value.some(
                (ind: InternDiscipline) => ind.discipline === filterItem.value,
              );
          },
          InputComponent: (filterProps) => (
            <FilterSingleSelect
              filterProps={filterProps}
              items={shortDisciplineLabels}
            />
          ),
        },
      ],
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
      filterable: false,
      renderCell: (
        internDisciplines: GridRenderCellParams<InternDiscipline[]>,
      ) => <>{internDisciplines.value.map(getTestChip)}</>,
    },
    {
      field: 'buttonPregledaj',
      headerName: '',
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: () => <Button disabled>Pregledaj</Button>,
    },
    {
      field: 'buttonIntervju',
      headerName: '',
      width: 100,
      sortable: false,
      filterable: false,
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
