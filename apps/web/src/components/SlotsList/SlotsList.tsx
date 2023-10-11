import { Discipline, SlotAvailability } from '@internship-app/types';
import { Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

type Props = {
  data: SlotAvailability[] | undefined;
};

const getDisciplinesChips = (disciplines: Discipline[]) => {
  return disciplines.map((discipline) => (
    <Chip key={discipline} label={discipline} />
  ));
};

const SlotsList: React.FC<Props> = ({ data = [] }) => {
  const columns: GridColDef[] = [
    {
      field: 'disciplines',
      headerName: 'Disciplines',
      width: 800,
      renderCell: (params: GridRenderCellParams) =>
        getDisciplinesChips(params.value),
    },
    { field: 'available', headerName: 'Available', width: 100 },
    { field: 'needed', headerName: 'Needed', width: 100 },
    { field: 'enough', headerName: 'Enough', type: 'boolean', width: 100 },
  ];

  const rows = data.map((slot, i) => ({
    id: i,
    disciplines: slot.disciplines,
    available: slot.available,
    needed: slot.needed,
    enough: slot.available >= slot.needed,
  }));

  return <DataGrid rows={rows} columns={columns} />;
};

export default SlotsList;
