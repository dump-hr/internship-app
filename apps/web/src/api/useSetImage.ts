import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { api } from '.';

type Request = {
  internId: string;
  blob: Blob;
};

const setImage = async ({ internId, blob }: Request) => {
  const file = new File([blob], `${internId}.png`, { type: 'image/png' });
  const form = new FormData();

  form.append('image', file, `${internId}.png`);

  return await api.putForm<never, string>(
    `/intern/setImage/${internId}`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
};

export const useSetImage = () => {
  return useMutation(setImage, {
    onMutate: () => {
      return { toastId: toast.loading('Uploading image...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Image uploaded', { id: context?.toastId });
    },
    onError: (error: string, _variables, context) => {
      toast.error(error, { id: context?.toastId });
    },
  });
};
