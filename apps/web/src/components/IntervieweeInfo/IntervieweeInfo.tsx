import { Intern } from '@internship-app/types';

import Webcamera from '../Webcamera';
import styles from './index.module.css';

type IntervieweeInfoProps = {
  image: string;
  setImage: (image: string) => void;
  intern: Intern;
};

const IntervieweeInfo = ({ image, setImage, intern }: IntervieweeInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.interviewInfo}>
        {Object.keys(intern.data).map((key: string) => {
          return (
            <div className={styles.atribute} key={key}>
              <h3>{key}:</h3>
              <span>
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

export default IntervieweeInfo;
