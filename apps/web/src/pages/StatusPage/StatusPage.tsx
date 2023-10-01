import { Typography } from '@mui/material';
import moment from 'moment';
import { useRoute } from 'wouter';

import { useFetchStatus } from '../../api/useFetchStatus';
import PublicLayout from '../../components/PublicLayout';
import {
  disciplineLabel,
  disciplineStatusLabel,
  interviewStatusLabel,
  testStatusLabel,
} from '../../constants/internConstants';
import { Path } from '../../constants/paths';
import * as styled from './styled';

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
    <PublicLayout>
      <styled.mainInfo>
        <styled.header>
          <styled.greetTitle>Bok {intern.firstName}!</styled.greetTitle>
          <styled.description>
            Ovdje možeš pratiti svoj trenutni status i rezultate ispita. O upadu
            na DUMP Internship bit ćeš obaviješten e-mailom.
          </styled.description>
        </styled.header>
        <styled.infoSection>
          <styled.interviewSection>
            <styled.infoTitle>Intervju</styled.infoTitle>
            <styled.spacedBetween>
              <styled.infoText>
                {interviewStatusLabel[intern.interviewStatus]}
              </styled.infoText>
              {intern.interviewSlot?.start && (
                <styled.infoText>
                  {moment(intern.interviewSlot.start).format(
                    'DD/MM/YYYY | HH-mm',
                  )}
                </styled.infoText>
              )}
            </styled.spacedBetween>
          </styled.interviewSection>
          <styled.disciplinesSection>
            <styled.infoTitle>Prijavljena područja</styled.infoTitle>
            {intern.internDisciplines.map((ind) => (
              <styled.disciplineItem>
                <styled.disciplineLabel>
                  {disciplineLabel[ind.discipline]}
                </styled.disciplineLabel>
                <styled.spacedBetween>
                  <styled.infoText>Status</styled.infoText>
                  <styled.infoText>
                    {disciplineStatusLabel[ind.status]}
                  </styled.infoText>
                </styled.spacedBetween>
                {ind.testStatus && (
                  <styled.spacedBetween>
                    <styled.infoText>
                      Test: {testStatusLabel[ind.testStatus].toLowerCase()}
                    </styled.infoText>
                    {ind.testSlot && (
                      <styled.infoText>
                        {moment(ind.testSlot.start).format(
                          'DD/MM/YYYY | HH-mm',
                        )}
                      </styled.infoText>
                    )}
                  </styled.spacedBetween>
                )}
              </styled.disciplineItem>
            ))}
          </styled.disciplinesSection>
        </styled.infoSection>
      </styled.mainInfo>
    </PublicLayout>
  );
};

export default StatusPage;
