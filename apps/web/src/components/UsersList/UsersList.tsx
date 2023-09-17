import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Intern } from '@prisma/client';

//import { useFetchInternDiscipline } from '../../api/useFetchInternDiscipline';

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

/*
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
];
*/

type Props = {
  data: Intern[] | undefined;
};

const UsersList: React.FC<Props> = ({ data = [] }) => {
  const rows = data.map((intern) => {
    //const { data: discipline } = useFetchInternDiscipline(intern.id);
    return {
      id: intern.id,
      lastName: intern.lastName,
      firstName: intern.firstName,
      discipline: 'Dev',
      emailApplication: Math.random() < 0.5,
      emailAppointment: Math.random() < 0.5,
      emailInterview: Math.random() < 0.5,
      emailExam: Math.random() < 0.5,
    };
  });

  /*
    data.map((intern) => return {
      id: intern.id,
      lastName: intern.lastName,
      firstName: intern.firstName,
      discipline: '/'  intern.data.discipline ,
      emailApplication: Math.random() < 0.5,
      emailAppointment: Math.random() < 0.5,
      emailInterview: Math.random() < 0.5,
      emailExam: Math.random() < 0.5,
    })) || [];
    */

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
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default UsersList;
