import { Intern } from '@internship-app/types';

import styles from './index.module.css';

interface CandidateInfoProps {
  item: Intern;
}

const CandidateInfoPage = (props: CandidateInfoProps) => {
  return (
    <div className={styles.page}>
      <h1>
        {props.item.firstName} {props.item.lastName}
      </h1>
      <div className={styles.datesContainer}>
        <div>Created at: {props.item.createdAt}</div>
        <div>Updated at: {props.item.updatedAt}</div>
      </div>

      <div className={styles.container}>
        <div>
          <img
            src={
              props.item.image
                ? props.item.image
                : 'https://i0.wp.com/www.bishoprook.com/wp-content/uploads/2021/05/placeholder-image-gray-16x9-1.png?ssl=1'
            }
            alt="Original one"
          />
        </div>
        <div>
          <div className={styles.atribute}>
            <h3>Email</h3>
            <span> {props.item.email} </span>
          </div>
          <div>
            {Object.keys(props.item.data).map((key: string) => {
              return (
                <div className={styles.atribute}>
                  <h3>{key}</h3>
                  <span> {props.item[key].toString()} </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfoPage;
