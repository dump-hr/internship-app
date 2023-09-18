import { Box, Button, Modal } from '@mui/joy';

import { useMakeEmails } from '../../api/useCreateEmails';
import EmailBox from '../../components/EmailBox';
import EmailList from '../../components/EmailList';

type Props = {
  emails: string[];
  on: boolean;
  close?: () => void;
};

export const EmailPage = ({ emails, on, close }: Props) => {
  const { mutate: makeEmailsMutation } = useMakeEmails();

  const sendEmails = async (text: string) => {
    makeEmailsMutation({ emails, text });
    alert('emails sent, check logs	');
  };

  return (
    <Modal open={on}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        padding={'1rem'}
      >
        Emails
        <EmailBox sendEmail={sendEmails} />
        <EmailList emails={emails} />
        <Button
          sx={{
            width: '200px',
            backgroundColor: 'red',
            color: 'white',
            marginTop: '1rem',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            '&:hover': { backgroundColor: 'gray', color: 'red' },
          }}
          onClick={close}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
