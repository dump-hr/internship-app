import { Intern, Question } from '@internship-app/types';

import styles from './index.module.css';

interface InternInfoProps {
  intern: Intern;
}

type Answer = Question & { tick: boolean; value: string | number | boolean };

const InternInfo = ({ intern }: InternInfoProps) => {
  console.log(intern);
  return (
    <div className={styles.page}>
      <h1>
        {intern.firstName} {intern.lastName}
      </h1>
      <div className={styles.emailContainer}>{intern.email}</div>

      <div className={styles.container}>
        <img
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
                  {key}:{' '}
                  {intern.data[key as keyof typeof intern.data].toString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.atribute}>
        <span>Score: {intern.interviewSlot?.score}</span>
      </div>
      {JSON.parse(JSON.stringify(intern.interviewSlot?.answers)).map(
        (item: Answer) => {
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
        },
      )}
    </div>
  );
};

export default InternInfo;
