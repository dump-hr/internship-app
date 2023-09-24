import { InternStatus, InterviewStatus } from '@internship-app/types';

type Criteria = {
  main: {
    name: string;
    status: InternStatus;
    interviewStatus: InterviewStatus;
  };
};
