import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './azure.config';

export const msalInstance = new PublicClientApplication(msalConfig);
