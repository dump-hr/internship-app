import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useFetchAllInterviewers } from '../../api/useFetchAllInterviewers';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';

const InterviewersPage = () => {
  const { data: interviewers } = useFetchAllInterviewers();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Ime i prezime', width: 130 },
    { field: 'disciplines', headerName: 'Područja', width: 130 },
  ];

  const rows = interviewers?.map((interviewer) => {
    return {
      id: interviewer.id,
      name: interviewer.name,
      disciplines: interviewer.disciplines.join(', '),
    };
  });

  return (
    <>
      <LogoHeader text="Intervjueri" />
      <LayoutSpacing>
        <button onClick={() => console.log(interviewers)}>
          Log interviewers
        </button>
        <DataGrid
          columns={columns}
          rows={rows || []}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </LayoutSpacing>
    </>
  );
};

export default InterviewersPage;
