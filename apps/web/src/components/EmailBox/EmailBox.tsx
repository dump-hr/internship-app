import React, { useState } from 'react';
import { Box, Button, Input } from '@mui/joy';

interface Props {
  sendEmail: (text: string) => void;
}

export const EmailBox: React.FC<Props> = ({ sendEmail }: Props) => {
  const [text, setText] = useState<string>('');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Input
        placeholder="Enter your email"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => sendEmail(text)}>Send</Button>
    </Box>
  );
};
