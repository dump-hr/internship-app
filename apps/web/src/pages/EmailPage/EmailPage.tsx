import { Box, Button, Modal } from '@mui/joy';

import { useMakeEmails } from '../../api/useCreateEmails';
import xSymbol from '../../assets/x-symbol.svg';
import EmailBox from '../../components/EmailBox';
import EmailGuide from '../../components/EmailGuide';
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
    <Modal
      open={on}
      sx={{
        overflow: 'scroll',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        padding={'1rem'}
      >
        <Button
          sx={{
            width: '50px',
            height: '50px',
            alignSelf: 'flex-end',
            backgroundColor: 'transparent',
            color: 'white',
            marginTop: '0.3rem',
            transition: 'color 0.3s ease',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'red',
              img: { filter: 'invert(1)' },
            },
            img: {
              filter: 'invert(0)',
              transition: 'filter 0.3s ease',
              height: '100%',
              width: '100%',
            },
          }}
          onClick={close}
        >
          <img src={xSymbol} alt="close" />
        </Button>
        Emails
        <EmailBox sendEmail={sendEmails} />
        <EmailGuide />
        <EmailList emails={emails} />
      </Box>
    </Modal>
  );
};
