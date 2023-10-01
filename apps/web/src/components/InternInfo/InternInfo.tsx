import { Intern, InternDiscipline, Question } from '@internship-app/types';

import styles from './index.module.css';

interface InternInfoProps {
  intern: Intern;
}

type Answer = Question & { tick: boolean; value: string | number | boolean };

const InternInfo = ({ intern }: InternInfoProps) => {
  return (
    <div className={styles.page}>
      <h1 className={styles.internFullName}>
        {intern.firstName} {intern.lastName}
      </h1>

      <div className={styles.emailContainer}>
        <div>{intern.email}</div>

        {Array.isArray(intern.internDisciplines) &&
          intern.internDisciplines.map(
            (discipline: InternDiscipline, index: number) => {
              return (
                <span key={discipline.discipline}>
                  {discipline.discipline}
                  {index !== intern.internDisciplines.length - 1 && ', '}
                </span>
              );
            },
          )}
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
      </div>

      {intern.interviewSlot && (
        <div className={styles.atribute}>
          <span>
            <b>Score:</b> {intern.interviewSlot?.score}
          </span>

          {Array.isArray(intern.interviewSlot?.answers) &&
            intern.interviewSlot?.answers.map((item: Answer) => {
              return (
                <div
                  className={item.tick ? styles.tick : styles.atribute}
                  key={item.id}
                >
                  <h3>
                    {item.title} {!item.tick || '⚠️'}
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
