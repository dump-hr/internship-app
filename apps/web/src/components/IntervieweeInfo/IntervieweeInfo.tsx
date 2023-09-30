import { Intern } from '@internship-app/types';

import Webcamera from '../Webcamera';
import styles from './index.module.css';

type IntervieweeInfoProps = {
  image: string;
  setImage: (image: string) => void;
  intern: Intern;
};

const IntervieweeInfo = ({ image, setImage, intern }: IntervieweeInfoProps) => {
  const info = intern.data as { [key: string]: string };

  return (
    <div className={styles.container}>
      <div className={styles.interviewInfo}>
        <h1>
          {intern.firstName} {intern.lastName}
        </h1>
        <div className={styles.interviewInfoCol}>
          <div>Email: {intern.email}</div>
          <div>Mobitel: {info.phoneNumber} </div>
          <div>Datum rođenja: {info.dateOfBirth}</div>
          <div>
            {info.educationOrEmploymentStatus}, {info.highSchoolOrCollegeName},{' '}
            {info.yearOfStudy}
          </div>
        </div>

        <div className={styles.interviewInfoCol}>
          <div>
            Područja:{' '}
            {intern.internDisciplines.map((id) => id.discipline).join(', ')}
          </div>
          <div>
            Kako si saznao/la za internship: {info.foundOutAboutInternshipBy}
          </div>
          <div>
            Zašto se prijavljuješ na internships: {info.reasonForApplying}
          </div>
        </div>
      </div>
      <Webcamera image={image} setImage={setImage} />
    </div>
  );
};

export default IntervieweeInfo;
