import { Intern } from '@internship-app/types';

import styles from './index.module.css';

interface InternInfoProps {
  intern: Intern;
}

type Item = {
  id: string;
  tick: boolean;
  type: string;
  title: string;
  value: string | number;
  category: string;
};
const InternInfo = ({ intern }: InternInfoProps) => {
  console.log(intern);
  return (
    <div className={styles.page}>
      <h1>
        {intern.firstName} {intern.lastName}
      </h1>

      <div className={styles.container}>
        <img
          src={
            intern.image ||
            'https://images.placeholders.dev/?width=650&height=365'
          }
          alt="Intern image"
        />
        <div>
          <div className={styles.atribute}>
            <h3>Email</h3>
            <span> {intern.email} </span>
          </div>
          <div>
            {Object.keys(intern.data).map((key: string) => {
              return (
                <div className={styles.atribute}>
                  <h3>{key}</h3>
                  <span>
                    {intern.data[key as keyof typeof intern.data].toString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {JSON.parse(JSON.stringify(intern.interviewSlot?.answers)).map(
        (item: Item) => {
          return (
            <div
              className={item.tick ? styles.tick : styles.atribute}
              key={item.id}
            >
              <h3>
                {item.title} {item.tick ? '⚠️' : ''}
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
