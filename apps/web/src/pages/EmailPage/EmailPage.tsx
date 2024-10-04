import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import { Box, Button, Input, Modal } from '@mui/joy';
import { useState } from 'react';

import { useMakeEmails } from '../../api/useCreateEmails';
import { useSendEmails } from '../../api/useSendEmails';
import xSymbol from '../../assets/x-symbol.svg';
import EmailBox from '../../components/EmailBox';
import EmailGuide from '../../components/EmailGuide';
import EmailList from '../../components/EmailList';
import EmailPreviewList from '../../components/EmailPreviewList';

type Props = {
  emails: string[];
  on: boolean;
  close?: () => void;
};

const defaultEmailText = `
pozdrav {{ intern.firstName }},

ovo su tvoja podrucja:
{% for internDiscipline in intern.internDisciplines -%}
- {{ internDiscipline.discipline }}
{% endfor %}
`.trim();

export const EmailPage = ({ emails, on, close }: Props) => {
  useMsalAuthentication(InteractionType.Redirect);

  const [subject, setSubject] = useState<string>('');
  const [emailPreviewOpen, setEmailPreviewOpen] = useState<boolean>(false);
  const [emailList, setEmailList] = useState<string[]>([]);
  const [text, setText] = useState<string>(defaultEmailText);

  const { mutateAsync: makeEmailsMutation } = useMakeEmails();
  const { mutateAsync: sendEmailsMutation } = useSendEmails(() => {
    setSubject('');
    setEmailPreviewOpen(false);
    setEmailList([]);
    setText(defaultEmailText);
    close?.();
  });

  const makeEmails = async () => {
    const createdEmails = await makeEmailsMutation({ emails, text });
    setEmailList(createdEmails);
    setEmailPreviewOpen(true);
  };

  const sendEmails = async () => {
    await sendEmailsMutation({ emails, text, subject });
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
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          inputMode="text"
          sx={{
            width: '66vw',
            backgroundColor: '#D9D9D9',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            input: {
              padding: '1rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              width: '100%',
            },
          }}
          placeholder="Subject"
        />
        <EmailBox
          sendEmail={makeEmails}
          body={text}
          setBody={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(event.target.value)
          }
        />
        <EmailPreviewList
          subject={subject}
          emails={emailList}
          open={emailPreviewOpen}
          sendEmails={sendEmails}
          close={() => setEmailPreviewOpen(false)}
        />
        <EmailList emails={emails} />
        <EmailGuide />
      </Box>
    </Modal>
  );
};
