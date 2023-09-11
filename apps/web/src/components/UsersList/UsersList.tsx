import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns: GridColDef[] = [
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
    field: 'button-pregledaj',
    headerName: '',
    width: 110,
    sortable: false,
    renderCell: () => <Button>Pregledaj</Button>,
  },
  {
    field: 'button-intervju',
    headerName: '',
    width: 100,
    sortable: false,
    renderCell: () => <Button>Intervju</Button>,
  },
];

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    age: 35,
    discipline: 'Dev',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 2,
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
    discipline: 'Marketing',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 3,
    lastName: 'Lannister',
    firstName: 'Jaime',
    age: 45,
    discipline: 'Dev',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 4,
    lastName: 'Stark',
    firstName: 'Arya',
    age: 16,
    discipline: 'Dev',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 5,
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    age: null,
    discipline: 'Dev',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 6,
    lastName: 'Melisandre',
    firstName: 'Ivan',
    age: 150,
    discipline: 'Dev',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 7,
    lastName: 'Clifford',
    firstName: 'Ferrara',
    age: 44,
    discipline: 'Dizajn',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 8,
    lastName: 'Frances',
    firstName: 'Rossini',
    age: 36,
    discipline: 'Multimedija',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
  {
    id: 9,
    lastName: 'Roxie',
    firstName: 'Harvey',
    age: 65,
    discipline: 'Dev',
    emailApplication: Math.random() < 0.5,
    emailAppointment: Math.random() < 0.5,
    emailInterview: Math.random() < 0.5,
    emailExam: Math.random() < 0.5,
  },
];

const UsersList = () => {
  return (
    <div style={{ height: 400, width: '100%', marginTop: '30px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
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
