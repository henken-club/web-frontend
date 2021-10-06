import {useAuth0} from '@auth0/auth0-react';
import {useEffect, useState} from 'react';

export const useAccessToken = (): {token: string | null} => {
  const {isAuthenticated, getAccessTokenSilently} = useAuth0();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  return {token};
};
