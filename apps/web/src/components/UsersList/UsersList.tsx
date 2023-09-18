import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Intern } from '@prisma/client';

import { useFetchAllInternDisciplines } from '../../api/useFetchAllInternDisciplines';

const handleInterviewClick = (internId: string) => {
  window.location.href = `/interview/${internId}`;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 0 },
  { field: 'firstName', headerName: 'Ime', width: 130 },
  { field: 'lastName', headerName: 'Prezime', width: 130 },
  { field: 'discipline', headerName: 'Područje', width: 130 },
  {
    field: 'emailApplication',
    headerName: 'Prijava',
    width: 70,
    type: 'boolean',
    sortable: false,
  },
  {
    field: 'emailAppointment',
    headerName: 'Termin',
    width: 70,
    type: 'boolean',
    sortable: false,
  },
  {
    field: 'emailInterview',
    headerName: 'Intervju',
    width: 70,
    type: 'boolean',
    sortable: false,
  },
  {
    field: 'emailExam',
    headerName: 'Ispit',
    width: 70,
    type: 'boolean',
    sortable: false,
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
      <Button onClick={() => handleInterviewClick(params.row.id)}>
        Intervju
      </Button>
    ),
  },
];

type Props = {
  data: Intern[] | undefined;
};

const UsersList: React.FC<Props> = ({ data = [] }) => {
  const { data: internDisciplines } = useFetchAllInternDisciplines();

  const rows = data.map((intern) => {
    return {
      id: intern.id,
      lastName: intern.lastName,
      firstName: intern.firstName,
      discipline:
        internDisciplines?.find(
          (internDiscipline) => internDiscipline.internId === intern.id,
        )?.discipline || '/',
      emailApplication: Math.random() < 0.5,
      emailAppointment: Math.random() < 0.5,
      emailInterview: Math.random() < 0.5,
      emailExam: Math.random() < 0.5,
    };
  });

  return (
    <div
      style={{
        height: 400,
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
            paginationModel: { page: 0, pageSize: 5 },
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
