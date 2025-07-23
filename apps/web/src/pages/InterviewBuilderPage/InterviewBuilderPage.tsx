import { InterviewQuestions } from '../../components/InterviewQuestions';
import LogoHeader from '../../components/LogoHeader';
import classes from './index.module.css';

export const InterviewBuilderPage = () => {
  return (
    <>
      <LogoHeader text={'Interview Builder'} />
      <main className={classes.interviewBuilder}>
        <h1>Interview Questions Builder</h1>
        <InterviewQuestions />
      </main>
    </>
  );
};
