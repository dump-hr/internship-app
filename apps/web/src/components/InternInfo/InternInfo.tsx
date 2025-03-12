import {
  Intern,
  InternDiscipline,
  Question,
  TestStatus,
} from '@internship-app/types';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

import {
  disciplineLabel,
  internActionLabel,
} from '../../constants/internConstants';
import { Path } from '../../constants/paths';
import styles from './index.module.css';
import InternNotes from './InternNotes';

interface InternInfoProps {
  intern: Intern;
}

type Answer = Question & { tick: boolean; value: string | number | boolean };

const logColumns: GridColDef[] = [
  { field: 'action', headerName: 'Akcija', width: 110 },
  { field: 'date', headerName: 'Datum', width: 100 },
];

const InternInfo = ({ intern }: InternInfoProps) => {
  const logRows = intern.logs.map((il) => ({
    id: il.id,
    action: internActionLabel[il.action],
    date: moment(il.date).format('DD.MM. HH:mm'),
  }));

  const interview = intern.interviewSlot;
  const interviewInfo =
    'Intervju: ' +
    [
      interview && moment(interview.start).format('DD.MM. HH:mm'),
      intern.interviewStatus,
      interview?.interviewers.map((int) => int.interviewer.name).join(', '),
    ]
      .filter((a) => a)
      .join(' | ');

  const testInfo = (ind: InternDiscipline) =>
    `${disciplineLabel[ind.discipline]} test: ` +
    [
      ind.testSlot && moment(ind.testSlot?.start).format('DD.MM. HH:mm'),
      ind.testSlot && `${ind.testScore}/${ind.testSlot?.maxPoints}`,
      ind.testStatus,
    ]
      .filter((a) => a)
      .join(' | ');

  return (
    <div className={styles.page}>
      <h1 className={styles.internFullName}>
        {intern.firstName} {intern.lastName}
      </h1>

      <div className={styles.header}>
        <div className={styles.mainInfoContainer}>
          <div>{intern.email}</div>
          <div>
            Registracija: {moment(intern.createdAt).format('DD.MM. HH:mm')}
          </div>

          <div>
            {intern.internDisciplines
              .map((ind) => disciplineLabel[ind.discipline])
              .join(', ')}
          </div>

          <div>{interviewInfo}</div>
          {intern.internDisciplines
            .filter((ind) => ind.testStatus)
            .map((ind) => (
              <div key={ind.discipline}>
                <a
                  href={
                    ind.testStatus == TestStatus.Done
                      ? Path.TestReview.replace(
                          ':testSlotId',
                          ind.testSlotId ?? '',
                        )
                          .replace(':group', 'intern')
                          .replace(':groupId', intern.id)
                      : undefined
                  }
                >
                  {testInfo(ind)}
                </a>
              </div>
            ))}
        </div>

        <InternNotes intern={intern} />
      </div>

      <div className={styles.container}>
        <img
          className={styles.image}
          src={
            intern.image ||
            'https://images.placeholders.dev/?width=650&height=365'
          }
          alt="Intern image"
        />
        <div className={styles.data}>
          {Object.keys(intern.data).map((key: string) => {
            return (
              <div className={styles.atribute} key={key}>
                <span>
                  <b>{key}: </b>
                  {intern.data[key as keyof typeof intern.data].toString()}
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.logGrid}>
          <DataGrid
            columns={logColumns}
            rows={logRows}
            pageSizeOptions={[100]}
          />
        </div>
      </div>

      {intern.interviewSlot && (
        <div className={styles.atribute}>
          <span>
            <b>Score:</b> {intern.interviewSlot?.score}
          </span>

          {Array.isArray(intern.interviewSlot?.answers) &&
            intern.interviewSlot?.answers.map((item: Answer) => {
              if (!item.value) return null;

              if (
                !intern?.internDisciplines?.some(
                  (discipline) => discipline.discipline === 'Marketing',
                ) &&
                item.id.includes('mark')
              )
                return null;

              return (
                <div
                  className={item.tick ? styles.tick : styles.atribute}
                  key={item.id}
                >
                  <h3 className={styles.itemTitle}>
                    {item.question} {!item.tick || '⚠️'}
                  </h3>
                  <span>{item.value}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default InternInfo;
