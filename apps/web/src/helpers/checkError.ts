import { ErrorResponse } from '@internship-app/types';
import toast from 'react-hot-toast';

export const checkError = (error: ErrorResponse, message: string) => {
  if (error.status !== 403) {
    toast.error(`${message}: ${error.message}`);
    return;
  }

  toast.error('Nisi admin plebu');
};
