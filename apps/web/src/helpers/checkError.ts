import { ErrorResponse } from '@internship-app/types';
import toast from 'react-hot-toast';

export const checkError = (error: ErrorResponse) => {
  if (error.status !== 403) {
    toast.error(`Greška pri izvođenju akcije: ${error.message}`);
    return;
  }

  toast.error('Nisi admin plebu');
};
