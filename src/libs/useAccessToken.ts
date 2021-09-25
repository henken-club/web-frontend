import {useState} from 'react';

export const useAccessToken = (): {token: string | null} => {
  const [token] = useState<string | null>('test');

  return {token};
};
