import { Intern, InternDiscipline } from '@internship-app/types';

import { Path } from '../../constants/paths';
import Webcamera from '../Webcamera';
import styles from './index.module.css';

type IntervieweeInfoProps = {
  image: string;
  setImage: (image: string) => void;
  intern: Intern;
};

export const IntervieweeInfo = ({
  image,
  setImage,
  intern,
}: IntervieweeInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.interviewInfo}>
        <a
          className={styles.internFullName}
          href={Path.Intern.replace(':internId', intern.id)}
          target="_blank"
        >
          {intern.firstName} {intern.lastName}
        </a>

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

        <div className={styles.notesContainer}>
          <b>Notes</b>
          {intern.notes.split('\n').map((note) => (
            <p>{note}</p>
          ))}
        </div>

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
      <Webcamera image={image} setImage={setImage} />
    </div>
  );
};
