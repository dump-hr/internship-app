import { Button } from '@mui/joy';
import { Box, Modal, Typography } from '@mui/material';

import xSymbol from '../../assets/x-symbol.svg';
import EmailPreview from '../EmailPreview';

interface EmailListProps {
  subject: string;
  emails: string[];
  open: boolean;
  close?: () => void;
  sendEmails: () => void; //ovo dodaje duje il ko god radi mail callove
}

export const EmailPreviewList = ({
  subject,
  emails,
  open,
  sendEmails,
  close,
}: EmailListProps) => (
  <Modal
    open={open}
    sx={{
      overflow: 'scroll',
    }}
  >
    <Box
      flexDirection={'column'}
      display={'flex'}
      padding={'1rem'}
      bgcolor={'white'}
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
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
      <Typography fontSize={'20px'}>Preview of emails:</Typography>
      {emails &&
        emails.map((email) => <EmailPreview subject={subject} body={email} />)}
      <Button
        sx={{
          width: '200px',
          backgroundColor: '#D9D9D9',
          color: '#000000',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          '&:hover': { backgroundColor: '#000000', color: '#D9D9D9' },
        }}
        onClick={sendEmails}
      >
        Send
      </Button>
    </Box>
  </Modal>
);
