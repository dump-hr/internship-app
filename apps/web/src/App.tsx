import './App.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Toaster } from 'react-hot-toast';

import { AccountInfo } from '@azure/msal-browser';

import { Router } from './Router.tsx';
import { useEffect, useState } from 'react';
import { msalInstance } from './configs/msalInstance.ts';

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [account, setAccount] = useState<AccountInfo>();

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        const response = await msalInstance.handleRedirectPromise();

        const account =
          response?.account ?? (await msalInstance.getAllAccounts()[0]);

        if (!account) {
          await msalInstance.loginRedirect({ scopes: ['openid', 'profile'] });
        } else {
          setAccount(account);
          setIsReady(true);
        }
      } catch (error) {
        console.error('MSAL initialization error:', error);
      }
    };

    initializeMsal();
  }, []);

  if (!isReady) return <div>error</div>;
  if (!account) return <div>can't get account</div>;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router />
        <Toaster />
      </LocalizationProvider>
    </>
  );
};
