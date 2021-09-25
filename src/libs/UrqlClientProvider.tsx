import {
  createClient,
  Client as UrqlClient,
  Provider as UrqlProvider,
} from 'urql';
import React, {useEffect, useState} from 'react';

export const UrqlClientProvider: React.FC = ({children}) => {
  const [client, setClient] = useState<UrqlClient | null>(null);

  useEffect(() => {
    setClient(
      createClient({
        // eslint-disable-next-line no-process-env
        url: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      }),
    );
  }, []);

  return client ? (
    <UrqlProvider value={client}>{children}</UrqlProvider>
  ) : (
    <>{children}</>
  );
};
