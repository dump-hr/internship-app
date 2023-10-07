import { useEffect } from 'react';

import { useDebounce } from './useDebounce';

export const useLocalSave = (
  enabled = true,
  key: string,
  value: unknown,
  cb: (value: unknown) => void,
) => {
  useEffect(() => {
    if (!enabled) return;

    const savedValue = JSON.parse(localStorage.getItem(key) ?? 'null');
    if (savedValue) {
      cb(savedValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key]);

  const save = useDebounce(() => {
    console.log('saving');
    localStorage.setItem(key, JSON.stringify(value));
  });

  useEffect(() => {
    if (!enabled) return;

    save();
  }, [enabled, value, save]);

  return null;
};
