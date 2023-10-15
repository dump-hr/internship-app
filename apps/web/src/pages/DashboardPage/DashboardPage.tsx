import {
  DisciplineStatus,
  Intern,
  InternStatus,
  InterviewStatus,
} from '@internship-app/types';
import { Button, Grid, Switch } from '@mui/material';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { useFetchAllInterns } from '../../api/useFetchAllInterns';
import AdminPage from '../../components/AdminPage';
import BoardActions from '../../components/BoardActions';
import InternFilter from '../../components/InternFilter';
import {
  FilterCriteria,
  getInternFilter,
} from '../../components/InternFilter/filter';
import InternList from '../../components/InternList/InternList';
import EmailPage from '../EmailPage';
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

  const [selection, setSelection] = useState<string[]>([]);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const toggleActions = () => setActionsOpen((prev) => !prev);
  const [showDuplicates, setShowDuplicates] = useState(false);

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
      label: 'Nadol. intervjui',
      value: interns?.filter(
        (i) => i.interviewStatus === InterviewStatus.Pending,
      ).length,
    },
    {
      label: 'Obav. intervjui',
      value: interns?.filter((i) => i.interviewStatus === InterviewStatus.Done)
        .length,
    },
    {
      label: 'Čeka odluku',
      value: internsWithStatus?.filter((i) => i.status === InternStatus.Pending)
        .length,
    },
    {
      label: 'Primljeno',
      value: internsWithStatus?.filter(
        (i) => i.status === InternStatus.Approved,
      ).length,
    },
  ];

  const duplicateInterns =
    internsWithStatus?.filter(
      (i1) =>
        internsWithStatus?.filter(
          (i2) =>
            i1.firstName === i2.firstName &&
            i1.lastName === i2.lastName &&
            i1.status !== InternStatus.Rejected &&
            i2.status !== InternStatus.Rejected,
        ).length > 1,
    ) || [];

  return (
    <AdminPage headerText="Dashboard">
      <Grid container spacing={2} mt={1}>
        {stats.map((stat) => (
          <Grid item xs={12} md={2} textAlign="center" key={stat.label}>
            <div className={c.infoBox}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </Grid>
        ))}
      </Grid>

      {actionsOpen && <BoardActions internIds={selection} />}

      <InternFilter submitHandler={filterHandler} disabled={showDuplicates} />

      <Grid item xs={12} md={5}>
        <div className={c.buttonsWrapper}>
          <div className={c.switchWrapper}>
            Prikaži sve
            <Switch
              onChange={() => setShowDuplicates(!showDuplicates)}
              disabled={duplicateInterns.length === 0}
            />
            {duplicateInterns.length === 0 ? (
              <i style={{ color: '#ababab' }}>Nema duplikata</i>
            ) : (
              'Prikaži duplikate'
            )}
          </div>

          <Button disabled>Pregledaj dev ispit</Button>
          <Button onClick={() => setEmailDialogOpen(true)}>Pošalji mail</Button>
          <Button
            onClick={toggleActions}
            disabled={!selection.length && !actionsOpen}
          >
            Toggleaj akcije
          </Button>
        </div>
      </Grid>

      {actionsOpen && <>{selection.length} interna selektirano.</>}
      <InternList
        data={
          showDuplicates
            ? duplicateInterns
            : internsWithStatus?.filter(getInternFilter(filterCriteria))
        }
        setSelection={setSelection}
      />

      <EmailPage
        on={emailDialogOpen}
        close={() => setEmailDialogOpen(false)}
        emails={
          interns
            ?.filter((i) => selection.includes(i.id))
            .map((i) => i.email) || []
        }
      />
    </AdminPage>
  );
};

export default DashboardPage;
