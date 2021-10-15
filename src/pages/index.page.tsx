import {NextPage} from 'next';
import Link from 'next/link';
import React from 'react';

import {useAuth} from '~/auth/useAuth';
import {useViewer} from '~/auth/useViewer';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;

export const Page: NextPage<PageProps> = ({...props}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth();
  const viewer = useViewer();

  return (
    <>
      <p>IndexPage</p>
      {!isAuthenticated && (
        <button
          type="button"
          onClick={() => loginWithRedirect()}
        >
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
