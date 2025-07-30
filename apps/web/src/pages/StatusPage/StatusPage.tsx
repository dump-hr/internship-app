import { InterviewStatus, TestStatus } from '@internship-app/types';
import { Typography } from '@mui/material';
import moment from 'moment';
import { Link, useRoute } from 'wouter';

import { useFetchStatus } from '../../api/useFetchStatus';
import { PublicLayout } from '@components/index';
import {
  disciplineLabel,
  disciplineStatusLabel,
  interviewStatusLabel,
  testStatusLabel,
  Path,
} from '@constants/index';
import { DisciplineCard } from './DisciplineCard';
import * as styled from './styled';

export const StatusPage = () => {
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
      <styled.layout>
        <styled.mainInfo>
          <styled.header>
            <styled.greetTitle>Bok {intern.firstName}!</styled.greetTitle>
            <styled.description>
              Ovdje možeš pratiti svoj trenutni status i rezultate ispita. O
              upadu na DUMP Internship i terminu intervjua obavijestit ćemo te
              mailom. Ako želiš izmijeniti prijavljena područja, javi nam se na{' '}
              <Link to="mailto:info@dump.hr">info@dump.hr</Link>.
            </styled.description>
          </styled.header>
          <styled.infoSection>
            <styled.interviewSection>
              <styled.infoTitle>Intervju</styled.infoTitle>
              <styled.spacedBetween>
                {intern.interviewStatus === InterviewStatus.PickTerm ? (
                  <styled.link
                    href={Path.ScheduleInterview.replace(':internId', internId)}
                  >
                    Klikni za biranje termina intervjua
                  </styled.link>
                ) : (
                  <styled.infoText>
                    {interviewStatusLabel[intern.interviewStatus]}
                  </styled.infoText>
                )}
                {intern.interviewSlot?.start && (
                  <styled.infoText>
                    {moment(intern.interviewSlot.start).format(
                      'DD/MM/YYYY | HH:mm',
                    )}
                  </styled.infoText>
                )}
              </styled.spacedBetween>
            </styled.interviewSection>
            <styled.disciplinesSection>
              <styled.infoTitle>Prijavljena područja</styled.infoTitle>
              {intern.internDisciplines.map((ind) => (
                <styled.disciplineItem key={ind.discipline}>
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
                      {ind.testStatus === TestStatus.PickTerm ? (
                        <styled.link
                          href={Path.ScheduleTest.replace(
                            ':discipline',
                            ind.discipline,
                          ).replace(':internId', internId)}
                        >
                          Klikni za biranje termina testa
                        </styled.link>
                      ) : (
                        <styled.infoText>
                          Test: {testStatusLabel[ind.testStatus].toLowerCase()}
                        </styled.infoText>
                      )}
                      {ind.testSlot && (
                        <styled.infoText>
                          {moment(ind.testSlot.start).format(
                            'DD/MM/YYYY | HH:mm',
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
        <styled.disciplineCardList>
          {intern.internDisciplines.map((ind) => (
            <DisciplineCard internDiscipline={ind} key={ind.discipline} />
          ))}
        </styled.disciplineCardList>
      </styled.layout>
    </PublicLayout>
  );
};
