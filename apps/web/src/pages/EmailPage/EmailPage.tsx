import { Box, Button, Modal } from '@mui/joy';
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

type Props = {
  emails: string[];
  on: boolean;
  close?: () => void;
};

export const EmailPage = ({ emails, on, close }: Props) => {
  const { mutate: makeEmailsMutation } = useMakeEmails();

  const sendEmails = async (text: string) => {
    makeEmailsMutation({ emails: emails, text });
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
          style={{
            width: '200px',
            backgroundColor: 'red',
            color: 'white',
            marginTop: '1rem',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'gray';
            e.currentTarget.style.color = 'red';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'red';
            e.currentTarget.style.color = 'white';
          }}
          onClick={close}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
