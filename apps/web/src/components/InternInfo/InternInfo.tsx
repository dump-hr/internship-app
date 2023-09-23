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
        <div>
          <img
            src={
              'https://i0.wp.com/www.bishoprook.com/wp-content/uploads/2021/05/placeholder-image-gray-16x9-1.png?ssl=1'
            }
            alt="Placeholder"
          />
        </div>
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
