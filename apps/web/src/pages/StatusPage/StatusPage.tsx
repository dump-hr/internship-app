import { Box, Typography } from '@mui/material';
import { useRoute } from 'wouter';

import { useFetchStatus } from '../../api/useFetchStatus';
import { disciplineLabel } from '../../constants/internConstants';
import { Path } from '../../constants/paths';

const StatusPage = () => {
  const [, params] = useRoute(Path.Status);
  const internId = params?.internId || '';
  const { data: intern, isFetching } = useFetchStatus(internId);

  if (isFetching) {
    return <Typography>Učitavanje...</Typography>;
  }

  if (!intern) {
    return <Typography>Ne postoji prijava s tim ID-em!</Typography>;
  }

  return (
    <Box maxWidth="1280px" margin="auto">
      <Typography variant="h1">Status prijave</Typography>
      <Box>
        <Typography>
          {intern.firstName} {intern.lastName}
        </Typography>
        <Typography>{intern.email}</Typography>
      </Box>
      {intern.internDisciplines.map((ids) => (
        <Box>
          <Typography>{disciplineLabel[ids.discipline]}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StatusPage;
