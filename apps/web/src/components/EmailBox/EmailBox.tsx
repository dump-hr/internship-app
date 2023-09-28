import { Box, Button, Textarea } from '@mui/joy';
import React from 'react';

interface Props {
  sendEmail: () => void;
  body: string;
  setBody: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const EmailBox: React.FC<Props> = ({
  sendEmail,
  body,
  setBody,
}: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={'66vw'}
      height={'100%'}
    >
      <Textarea
        placeholder="Enter your email here"
        onChange={setBody}
        value={body}
        style={{
          width: '100%',
          height: '50vh',
          resize: 'none',
          backgroundColor: '#D9D9D9',
          marginBottom: '3rem',
        }}
      />
      <Button
        sx={{
          width: '200px',
          backgroundColor: '#D9D9D9',
          color: '#000000',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          '&:hover': { backgroundColor: '#000000', color: '#D9D9D9' },
        }}
        onClick={sendEmail}
      >
        Generate
      </Button>
    </Box>
  );
};
