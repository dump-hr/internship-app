import { Box } from '@mui/material';

// import { DataGrid } from '@mui/x-data-grid';
import { useFetchAllInterviewSlots } from '../../api/useFetchAllInterviewSlots.tsx';

export const InterviewStatsPage = () => {
  // const columns = [
  //   {
  //     field: 'flag',
  //     headerName: 'Flag',
  //     flex: 1,
  //   },
  //   {
  //     field: 'intern',
  //     headerName: 'Enter intern',
  //     flex: 1,
  //   },
  // ];
  const slots = useFetchAllInterviewSlots();
  console.log(slots.data);
  return (
    <main>
      <h1>aaaaaaaaaa</h1>
      <Box>{/*<DataGrid columns={columns} rows={} />*/}</Box>
    </main>
  );
};
