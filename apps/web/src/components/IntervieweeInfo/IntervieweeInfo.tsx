import { Discipline } from '@internship-app/types';

import Webcamera from '../Webcamera';
import styles from './index.module.css';

type Info = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  workingStatus: string;
  institutionName: string;
  yearOfStudy: number;
  field: Discipline;
  referral: string;
  applicationMotivation: string;
};

type IntervieweeInfoProps = {
  setUrl: (image: string) => void;
  info: Info;
};

const IntervieweeInfo = ({ setUrl, info }: IntervieweeInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.interviewInfo}>
        <h1>{info.fullName}</h1>
        <div className={styles.interviewInfoCol}>
          <div>Email: {info.email}</div>
          <div>Mobitel: {info.phone} </div>
          <div>Datum rođenja: {info.dateOfBirth}</div>
          <div>
            {info.workingStatus}, {info.institutionName}, {info.yearOfStudy}
          </div>
        </div>

        <div className={styles.interviewInfoCol}>
          <div>Područje: {info.field}</div>
          <div>Kako si saznao/la za internship: {info.referral}</div>
          <div>
            Zašto se prijavljujes na internships: {info.applicationMotivation}
          </div>
        </div>
      </div>
      <Webcamera setUrl={setUrl} />
    </div>
  );
};

export default IntervieweeInfo;
