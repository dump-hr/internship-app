import { Box, Typography } from '@mui/material';

interface EmailPreviewProps {
  subject: string;
  body: string;
}

export const EmailPreview = ({ subject, body }: EmailPreviewProps) => (
  <Box
    flexDirection={'column'}
    display={'flex'}
    width={'66vw'}
    padding={'1rem'}
    justifyContent={'space-around'}
  >
    <Typography fontSize={'20px'}>{subject}</Typography>

    <Typography fontSize={'10px'}>
      <pre>{body}</pre>
    </Typography>
  </Box>
);
