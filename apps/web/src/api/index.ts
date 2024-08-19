import { PublicClientApplication } from '@azure/msal-browser';
import axios, { AxiosError } from 'axios';

import { msalConfig } from '../configs/auth';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const msalInstance = new PublicClientApplication(msalConfig);

const acquireToken = async () => {
  const silentRequest = {
    scopes: ['openid', 'profile'],
    account: msalInstance.getAllAccounts()[0],
  };
  try {
    const response = await msalInstance.acquireTokenSilent(silentRequest);
    return response.idToken;
  } catch (error) {
    await msalInstance.acquireTokenRedirect(silentRequest);
  }
};

api.interceptors.request.use(async (config) => {
  await msalInstance.initialize();

  const token = await acquireToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

type ErrorResponse = AxiosError & {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    };
  };
};

api.interceptors.response.use(
  (response) => response.data,
  async (error: ErrorResponse) => {
    if (error.response) {
      if (error.response?.status === 401) {
        const silentRequest = {
          scopes: ['openid', 'profile'],
          account: msalInstance.getAllAccounts()[0],
          forceRefresh: true,
        };

        await msalInstance.acquireTokenRedirect(silentRequest);
      }

      return Promise.reject(error.response.data.message);
    }

    return Promise.reject(error.message);
  },
);

export const runApi = axios.create({
  baseURL: 'https://code-runner.bdeak.net/run',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
