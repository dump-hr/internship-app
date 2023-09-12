import { Box } from '@mui/joy';
import { useEffect, useState } from 'react';

import { api } from '../../api';
import { useMakeEmails } from '../../api/useCreateEmails';
import EmailBox from '../../components/EmailBox';
import EmailList from '../../components/EmailList';

type Intern = {
  firstName: string;
  lastName: string;
  email: string;
  disciplines: string[];
  data: {
    phoneNumber: number;
    dateOfBirth: string;
    educationOrEmploymentStatus: string;
    highSchoolOrCollegeName: string;
    foundOutAboutInternshipBy: string;
    reasonForApplying: string;
  };
};

export const EmailPage = () => {
  const [emailsToDisplay, setEmailsToDisplay] = useState<string[]>([]);
  async function getEmails() {
    const users = (await api.get('/intern')) as Intern[];
    console.log(users);
    const emails = users.map((user: Intern) => user.email);

    if (emails) {
      setEmailsToDisplay(emails as string[]);
    }
  }
  useEffect(() => {
    getEmails();
  }, []);

  const { mutate: makeEmailsMutation } = useMakeEmails();

  const sendEmails = async (text: string) => {
    await makeEmailsMutation({ emails: emailsToDisplay, text });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      padding={'1rem'}
    >
      Emails
      <EmailBox sendEmail={sendEmails} />
      <EmailList emails={emailsToDisplay} />
    </Box>
  );
};
