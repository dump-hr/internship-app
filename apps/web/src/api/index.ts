import axios, { AxiosError, AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{ message: string }>;
};

api.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  (response) => response.data,

  (error: ErrorResponse) =>
    Promise.reject(error.response.data.message || error.message),
);
