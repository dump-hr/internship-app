import './App.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';

import { Router } from './Router.tsx';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './configs/msalInstance.ts';

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
