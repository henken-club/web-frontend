import {createClient, Client, Provider, ClientOptions} from 'urql';
import React, {useEffect, useState} from 'react';

import {useAccessToken} from '~/libs/useAccessToken';

export const createUrqlClient = (options?: Omit<ClientOptions, 'url'>) =>
  createClient({
    ...options,
    // eslint-disable-next-line no-process-env
    url: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
  });

export const UrqlProvider: React.FC = ({children}) => {
  const [client, setClient] = useState<Client | null>(null);
  const {token} = useAccessToken();

  useEffect(() => {
    const setupClient = () => {
      setClient(
        createUrqlClient({
          fetchOptions: {
            headers: {
              authorization: token ? `Bearer ${token}` : '',
            },
          },
        }),
      );
    };

    setupClient();
  }, [token]);

  return client ? (
    <Provider value={client}>{children}</Provider>
  ) : (
    <>{children}</>
  );
};
