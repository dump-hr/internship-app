import { Box } from '@mui/joy';
import type { FC } from 'react';

interface Props {
  emails: string[];
}

export const EmailList: FC<Props> = ({ emails }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="space-around"
      width={'66vw'}
      padding={'1rem'}
      marginTop={'1rem'}
      bgcolor={'#D9D9D9'}
    >
      {emails.map((email) => (
        <Box display={'flex'} marginBottom={'1rem'} key={email}>
          {email}
        </Box>
      ))}
    </Box>
  );
};
