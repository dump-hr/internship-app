import { useFetchOldInternData } from '@api/index';
import styles from './OldInternData.module.css';

interface Props {
  name: string;
  surname: string;
  email: string;
}

export const OldInternData = ({ internData }: { internData: Props }) => {
  const { data } = useFetchOldInternData(internData);

  if (!data || data.length === 0) {
    return (
      <div className={styles.noData}>
        Nije pronađena prijašnja prijava interna
      </div>
    );
  }

  return (
    <div>
      <h2>Mogući postojeći interni: </h2>
      {data.map((intern, index) => (
        <section key={index}>
          <h3 className={styles.internTitle}>
            <em>
              {intern.firstName} {intern.lastName} ({intern.email})
            </em>
          </h3>
          <p className={styles.internDetails}>
            Područje: {intern.discipline}, bodovi na testu:{' '}
            {intern.test_score ?? 'N/A'}, bodovi na intervjuu:{' '}
            {intern.interview_score ?? 'N/A'}, godina prijave:{' '}
            {intern.applicationDate
              ? new Date(intern.applicationDate).getFullYear()
              : ''}
          </p>
        </section>
      ))}
    </div>
  );
};
