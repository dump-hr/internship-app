import { DisciplineStatus, TestStatus } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import { useRoute } from 'wouter';

import { useFetchStatus } from '../../api/useFetchStatus';
import {
  disciplineLabel,
  disciplineStatusLabel,
  interviewStatusLabel,
  testStatusLabel,
} from '../../constants/internConstants';
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

  const hasInterviewRight =
    !intern.interviewSlot &&
    intern.internDisciplines.some(
      (ind) => ind.status === DisciplineStatus.Pending,
    ) &&
    intern.internDisciplines.every(
      (ind) => ind.testStatus !== TestStatus.Pending,
    );
  //ovo se ionako treba iznova
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
        <Box key={ids.discipline}>
          <Typography>{disciplineLabel[ids.discipline]}</Typography>
          <Typography>Status: {disciplineStatusLabel[ids.status]}</Typography>
          {ids.testStatus && (
            <Typography>Test: {testStatusLabel[ids.testStatus]}</Typography>
          )}
          {ids.testSlot && (
            <Typography>Termin: @ {ids.testSlot.location}</Typography>
          )}
          {!ids.testSlot && ids.testStatus === TestStatus.Pending && (
            <Typography>Provjeri slobodne termine testa. ovojelink</Typography>
          )}
          {ids.testScore && (
            <Typography>
              Rezultat: {ids.testScore}/{ids.testSlot?.maxPoints}
            </Typography>
          )}
        </Box>
      ))}
      {hasInterviewRight && (
        <Typography>
          Pogledaj slobodne termine za intervju. ovojelink
        </Typography>
      )}
      {intern.interviewSlot && (
        <Box>
          <Typography>
            Status: {interviewStatusLabel[intern.interviewStatus]}
          </Typography>
          <Typography>Termin: {} @ DUMP Ured, FESB</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StatusPage;
