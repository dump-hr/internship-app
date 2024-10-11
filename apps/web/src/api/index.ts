import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

import { Path } from '../constants/paths';

export const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{ message: string }>;
};

api.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) => {
    if (error.response.status === 401) {
      history.pushState(null, '', Path.Login);
      toast.error(
        error.response.data.message || error.message || 'Forbbiden access',
      );
    }
    return Promise.reject(error.response.data.message || error.message);
  },
);

export const runApi = axios.create({
  baseURL: 'https://code-runner.bdeak.net/run',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const graphApi = axios.create({
  baseURL: 'https://graph.microsoft.com/v1.0',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

graphApi.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

graphApi.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) => {
    if (error.response.status === 401) {
      toast.error(
        error.response.data.message || error.message || 'Unauthorized access',
      );
    }
    return Promise.reject(error.response.data.message || error.message);
  },
);

const getAccessToken = async () => {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId || '');
  params.append('client_secret', clientSecret || '');
  params.append('scope', 'https://graph.microsoft.com/.default');

  const response = await axios.post(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response.data.access_token;
};
