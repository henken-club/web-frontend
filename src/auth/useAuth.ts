import {useAuth0} from '@auth0/auth0-react';

const mockedUseAuth0 = (): Pick<
  ReturnType<typeof useAuth0>,
  'isAuthenticated' | 'user' | 'getAccessTokenSilently' | 'loginWithRedirect'
> => ({
  isAuthenticated: true,
  user: {name: 'TestUser'},
  async getAccessTokenSilently() {
    return 'access_token';
  },
  async loginWithRedirect() {},
});
export const useAuth =
  // eslint-disable-next-line no-process-env
  process.env.NEXT_PUBLIC_MOCK_AUTH0_ENABLED === 'true'
    ? mockedUseAuth0
    : useAuth0;
