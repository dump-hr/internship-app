import { Typography } from '@mui/material';
import { useState } from 'react';

import EmailPage from './EmailPage';

export const HomePage = () => {
  const [emailsOn, setEmailsOn] = useState<boolean>(false);

  return (
    <div>
      <Typography>internship-app</Typography>
      <EmailPage
        on={emailsOn}
        close={() => setEmailsOn(false)}
        emails={['ante.roca@dump.hr']}
      />
      <button onClick={() => setEmailsOn(!emailsOn)}>Emails</button>
    </div>
  );
};
