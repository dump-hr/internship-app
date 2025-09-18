import { useFetchOldInternData } from '@api/index';

interface Props {
  name: string;
  surname: string;
  email: string;
}

export const OldInternData = ({ internData }: { internData: Props }) => {
  const { data } = useFetchOldInternData(internData);

  if (!data || data.length === 0) {
    return (
      <div style={{ margin: '50px 0' }}>
        Nije pronađena prijašnja prijava interna
      </div>
    );
  }

  return (
    <div>
      <h2>Mogući postojeći interni: </h2>
      {data.map((intern, index) => (
        <section key={index}>
          <h3 style={{ marginTop: '50px' }}>
            <em>
              {intern.first_name} {intern.last_name} ({intern.email})
            </em>
          </h3>
          <p style={{ marginBottom: '50px' }}>
            Područje: {intern.discipline}, bodovi na testu:{' '}
            {intern.test_score ?? 'N/A'}, bodovi na intervjuu:{' '}
            {intern.interview_score ?? 'N/A'}, godina prijave:{' '}
            {intern.applicationYear
              ? new Date(intern.applicationYear).getFullYear()
              : ''}
          </p>
        </section>
      ))}
    </div>
  );
};
