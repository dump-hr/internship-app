import { MsalProvider } from '@azure/msal-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { msalConfig } from './configs/azure.config';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PublicClientApplication } from '@azure/msal-browser';

import { App } from './App';

const queryClient = new QueryClient();
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MsalProvider>
  </React.StrictMode>,
);
