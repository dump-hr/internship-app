import { ErrorResponse } from '@internship-app/types';
import axios from 'axios';
import { msalInstance } from 'src/configs/msalInstance';

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const msal = msalInstance;

const acquireToken = async () => {
  const silentRequest = {
    scopes: ['openid', 'profile'],
    account: msal.getAllAccounts()[0],
  };

  try {
    const response = await msal.acquireTokenSilent(silentRequest);
    return response.idToken;
  } catch (error) {
    console.log(msal.getAllAccounts());
    console.log(error);
  }
};

api.interceptors.request.use(async (config) => {
  await msal.initialize();

  const token = await acquireToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error: ErrorResponse) => {
    if (error.response) {
      if (error.response?.status === 401) {
        const silentRequest = {
          scopes: ['openid', 'profile'],
          account: msal.getAllAccounts()[0],
          forceRefresh: true,
        };

        await msal.acquireTokenRedirect(silentRequest);
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
