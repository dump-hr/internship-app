import { DisciplineStatus, Intern, InternStatus } from '@internship-app/types';
import { Button, Grid } from '@mui/material';

import { useFetchAllInterns } from '../../api/useFetchAllInterns';
import { useFetchAllInterviewSlots } from '../../api/useFetchAllInterviewSlots';
import InternFilter from '../../components/InternFilter';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
import UsersList from '../../components/UsersList';
import c from './DashboardPage.module.css';

const getInternStatus = (intern: Intern) => {
  if (
    intern.internDisciplines.some(
      (ind) => ind.status === DisciplineStatus.Pending,
    )
  )
    return InternStatus.Pending;

  if (
    intern.internDisciplines.some(
      (ind) => ind.status === DisciplineStatus.Approved,
    )
  )
    return InternStatus.Approved;

  return InternStatus.Rejected;
};

const DashboardPage = () => {
  const { data: interns } = useFetchAllInterns();
  const { data: interviewSlots } = useFetchAllInterviewSlots();

  const internsWithStatus = interns?.map((i) => ({
    ...i,
    status: getInternStatus(i),
  }));

  return (
    <>
      <LogoHeader text="Kandidati" />
      <LayoutSpacing className={c.content}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <div className={c.infoBox}>
              <h3>{interns?.length}</h3>
              <p>Broj prijava</p>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={c.infoBox}>
              <h3>{interviewSlots?.length}</h3>
              <p>Broj intervjua</p>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={c.infoBox}>
              <h3>####</h3>
              <p>Broj poslanih mailova</p>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className={c.buttonsWrapper}>
              <Button disabled>Pregledaj dev ispit</Button>
              <Button disabled>Pošalji mail</Button>
            </div>
          </Grid>
        </Grid>
        <InternFilter />
        <UsersList data={internsWithStatus} />
      </LayoutSpacing>
    </>
  );
};

export default DashboardPage;
