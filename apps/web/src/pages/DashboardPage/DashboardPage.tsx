import {
  DisciplineStatus,
  Intern,
  InternStatus,
  InterviewStatus,
} from '@internship-app/types';
import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useFetchAllInterns } from '../../api/useFetchAllInterns';
import InternFilter from '../../components/InternFilter';
import {
  FilterCriteria,
  getInternFilter,
} from '../../components/InternFilter/filter';
import InternList from '../../components/InternList';
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

const initialState: { filterCriteria: FilterCriteria } = {
  filterCriteria: {
    main: { name: '', status: '', interviewStatus: '' },
    disciplines: {},
  },
};

const DashboardPage = () => {
  const { data: interns } = useFetchAllInterns();

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>(
    initialState.filterCriteria,
  );

  const internsWithStatus = interns?.map((intern) => ({
    ...intern,
    status: getInternStatus(intern),
  }));

  const filterHandler = (criteria: FieldValues) => {
    setFilterCriteria(criteria as FilterCriteria);
  };

  const stats = [
    {
      label: 'Broj prijava',
      value: interns?.length,
    },
    {
      label: 'Obav. intervjui',
      value: interns?.filter((i) => i.interviewStatus === InterviewStatus.Done)
        .length,
    },
    {
      label: 'Nadol. intervjui',
      value: interns?.filter((i) => i.interviewStatus === InterviewStatus.Done)
        .length,
    },
    {
      label: 'Primljeno',
      value: internsWithStatus?.filter(
        (i) => i.status === InternStatus.Approved,
      ).length,
    },
  ];

  return (
    <>
      <LogoHeader text="Kandidati" />
      <Box margin="auto" maxWidth="1200px" className={c.content}>
        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid item xs={12} md={2} textAlign="center" key={stat.label}>
              <div className={c.infoBox}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </Grid>
          ))}
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
      </Box>
    </>
  );
};

export default DashboardPage;
