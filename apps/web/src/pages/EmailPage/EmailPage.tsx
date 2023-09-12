import { Box } from '@mui/joy';

import EmailBox from '../../components/EmailBox';
import EmailList from '../../components/EmailList';

// interface Props {
//   emails?: string[];
//}

export const EmailPage = () => {
  const sendEmail = (text: string) => {
    console.log(text);
  };

  const emails = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      padding={'1rem'}
    >
      Emails
      <EmailBox sendEmail={sendEmail} />
      <EmailList emails={emails} />
    </Box>
  );
};
