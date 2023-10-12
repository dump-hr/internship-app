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

  if (window.location.pathname.startsWith('/internship-app')) {
    config.baseURL = '/internship-app/api';
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
  baseURL: '/run',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
