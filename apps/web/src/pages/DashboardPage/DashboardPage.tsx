import { useFetchAllInterns } from '@api/index';
import {
  AdminPage,
  BoardActions,
  CsvFile,
  FilterCriteria,
  getInternFilter,
  InternFilter,
  InternList,
  shortDisciplineLabels,
} from '@components/index';
import {
  Discipline,
  DisciplineStatus,
  InternStatus,
  InterviewStatus,
} from '@internship-app/types';
import { Button, Grid, Switch } from '@mui/material';
import { EmailPage } from '@pages/index';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import c from './DashboardPage.module.css';
import {
  deserializeFilters,
  getFullName,
  getInternStatus,
  serializeFilters,
} from './helpers';

const initialState: { filterCriteria: FilterCriteria } = {
  filterCriteria: {
    main: { name: '', status: '', interviewStatus: '' },
    disciplines: {},
  },
};

export const DashboardPage = () => {
  const [selection, setSelection] = useState<string[]>([]);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const toggleActions = () => setActionsOpen((prev) => !prev);
  const [showDuplicates, setShowDuplicates] = useState(false);

  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>(
    initialState.filterCriteria,
  );

  useEffect(() => {
    const urlFilters = deserializeFilters();
    setFilterCriteria(urlFilters);
  }, []);

  const { data: interns } = useFetchAllInterns();

  const internsWithStatus = interns?.map((intern) => ({
    ...intern,
    status: getInternStatus(intern),
  }));

  const filterHandler = (criteria: FieldValues) => {
    const filterCriteria = criteria as FilterCriteria;
    setFilterCriteria(filterCriteria);

    // Update URL with filter parameters
    const queryString = serializeFilters(filterCriteria);
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
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
    {
      label: Object.values(Discipline)
        .map((d) => shortDisciplineLabels[d])
        .join('/'),
      value: Object.values(Discipline)
        .map(
          (d) =>
            internsWithStatus?.filter((i) =>
              i.internDisciplines.some(
                (ind) =>
                  ind.discipline === d &&
                  ind.status === DisciplineStatus.Approved,
              ),
            ).length,
        )
        .join('/'),
    },
  ];

  const duplicateInterns =
    internsWithStatus?.filter(
      (i1) =>
        internsWithStatus?.filter((i2) => {
          const intern1Name = getFullName(i1);
          const intern2Name = getFullName(i2);

          return intern1Name === intern2Name;
        }).length > 1,
    ) || [];

  duplicateInterns.sort((i1, i2) => {
    const intern1Name = getFullName(i1);
    const intern2Name = getFullName(i2);

    return intern1Name.localeCompare(intern2Name);
  });

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

      <InternFilter
        submitHandler={filterHandler}
        disabled={showDuplicates}
        initialValues={filterCriteria}
      />

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

          <CsvFile
            data={internsWithStatus?.filter(getInternFilter(filterCriteria))}
          />

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
