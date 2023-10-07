import { Discipline, SlotAvailability } from '@internship-app/types';
import { Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

type Props = {
  data: SlotAvailability[] | undefined;
};

const getDisciplinesChips = (disciplines: Discipline[]) => {
  return disciplines.map((discipline) => (
    <Chip key={discipline} label={discipline.key} {...discipline} />
  ));
};

const SlotsList: React.FC<Props> = ({ data = [] }) => {
  const columns: GridColDef[] = [
    {
      field: 'disciplines',
      headerName: 'Disciplines',
      width: 800,
      renderCell: (params: GridRenderCellParams) =>
        getDisciplinesChips(params.value as Discipline[]),
    },
    { field: 'available', headerName: 'Available', width: 100 },
    { field: 'needed', headerName: 'Needed', width: 100 },
  ];

  const rows = data.map((slot, i) => ({
    id: i,
    disciplines: getDisciplinesChips(slot.disciplines),
    available: slot.available,
    needed: slot.needed,
  }));

  return (
    <div style={{ height: '400', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default SlotsList;
