import './App.css';
import './index.css'
import { MsalProvider } from '@azure/msal-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';

import { msalInstance } from './configs/msalInstance.ts';
import { Router } from './Router.tsx';

export const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MsalProvider instance={msalInstance}>
          <Router />
          <Toaster />
        </MsalProvider>
      </LocalizationProvider>
    </>
  );
};
