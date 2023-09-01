import axios, { AxiosError, AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{ message: string }>;
};

api.interceptors.response.use(
  (response) => response.data,

  (error: ErrorResponse) =>
    Promise.reject(error.response.data.message || error.message),
);
