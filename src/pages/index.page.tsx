import {NextPage} from 'next';
import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Link from 'next/link';

import {useViewer} from '~/libs/useViewer';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;

export const Page: NextPage<PageProps> = ({...props}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();
  const viewer = useViewer();

  return (
    <>
      <p>IndexPage</p>
      {!isAuthenticated && (
        <button type="button" onClick={() => loginWithRedirect()}>
          Log In
        </button>
      )}
      {JSON.stringify(viewer)}
      {viewer && (
        <>
          <p>{viewer.id}</p>
          <Link href={`/users/${viewer.alias}`}>
            <a>{viewer.alias}</a>
          </Link>
          <p>{viewer.displayName}</p>
        </>
      )}
    </>
  );
};
export default Page;
