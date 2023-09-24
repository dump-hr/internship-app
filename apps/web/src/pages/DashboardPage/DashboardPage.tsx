import { DisciplineStatus, Intern, InternStatus } from '@internship-app/types';
import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useFetchAllInterns } from '../../api/useFetchAllInterns';
import { useFetchAllInterviewSlots } from '../../api/useFetchAllInterviewSlots';
import InternFilter from '../../components/InternFilter';
import {
  FilterCriteria,
  getInternFilter,
} from '../../components/InternFilter/filter';
import InternList from '../../components/InternList';
import LayoutSpacing from '../../components/LayoutSpacing/LayoutSpacing';
import LogoHeader from '../../components/LogoHeader';
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

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    main: { name: '', status: '', interviewStatus: '' },
    disciplines: {},
  });

  const internsWithStatus = interns?.map((i) => ({
    ...i,
    status: getInternStatus(i),
  }));

  const filterHandler = (criteria: FieldValues) => {
    console.log(criteria as FilterCriteria);
    setFilterCriteria(criteria as FilterCriteria);
  };

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
        <InternFilter submitHandler={filterHandler} />
        <InternList
          data={internsWithStatus?.filter(getInternFilter(filterCriteria))}
        />
      </LayoutSpacing>
    </>
  );
};

export default DashboardPage;
