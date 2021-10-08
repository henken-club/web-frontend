import {Auth0Provider} from '@auth0/auth0-react';
import React from 'react';

const MockedAuth0Provider: React.FC = ({children}) => <>{children}</>;
export const AuthProvider =
  // eslint-disable-next-line no-process-env
  process.env.NEXT_PUBLIC_MOCK_AUTH0_ENABLED === 'true'
    ? MockedAuth0Provider
    : Auth0Provider;
