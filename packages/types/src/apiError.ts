import { AxiosError } from 'axios';

export type ErrorResponse = AxiosError & {
  response: {
    data: {
      statusCode: number;
      message: string;
      error: string;
    };
  };
};
