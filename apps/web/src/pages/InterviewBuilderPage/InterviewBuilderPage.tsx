import { InterviewQuestions, LogoHeader } from '@components/index';
import classes from './index.module.css';
import {
  useChangeInternshipApplicationStatus,
  useGetInternshipApplicationStatus,
} from '@api/index';
import { Switch } from '@mui/material';

export const InterviewBuilderPage = () => {
  const { mutateAsync } = useChangeInternshipApplicationStatus();
  const { data: isOpened } = useGetInternshipApplicationStatus();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!confirm('Želite li promijeniti status prijava?')) return;

    const checked = event.target.checked;
    await mutateAsync(checked);
  };

  return (
    <>
      <LogoHeader text={'Interview Builder'} />
      <main className={classes.interviewBuilder}>
        <div className={classes.applicationStatus}>
          <h2>
            Internship Application Status: {isOpened ? 'Otvorene' : 'Zatvorene'}
          </h2>
          <Switch checked={isOpened} onChange={handleChange} />
        </div>
        <h1>Interview Questions Builder</h1>
        <InterviewQuestions />
      </main>
    </>
  );
};
