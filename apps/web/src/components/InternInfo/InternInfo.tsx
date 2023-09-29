import { Intern } from '@internship-app/types';

import styles from './index.module.css';

interface InternInfoProps {
  intern: Intern;
}

const InternInfo = ({ intern }: InternInfoProps) => {
  return (
    <div className={styles.page}>
      <h1>
        {intern.firstName} {intern.lastName}
      </h1>

      {/*<div className={styles.datesContainer}> not sure if we need dates but they break the app
        <div>Created at: {intern.createdAt}</div>
        <div>Updated at: {intern.updatedAt}</div>
  </div>*/}

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
    </div>
  );
};

export default InternInfo;
