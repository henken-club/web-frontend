import {NextPage} from 'next';
import React from 'react';
import Link from 'next/link';
import {useAuth0} from '@auth0/auth0-react';

import {useViewer} from '~/libs/useViewer';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;

export const Page: NextPage<PageProps> = ({...props}) => {
  const {viewer} = useViewer();
  const {loginWithRedirect} = useAuth0();

  return (
    <>
      <p>IndexPage</p>
      {viewer && (
        <>
          <p>{viewer.id}</p>
          <Link href={`/users/${viewer.alias}`}>
            <a>{viewer.alias}</a>
          </Link>
          <p>{viewer.displayName}</p>
        </>
      )}
      {!viewer && <button onClick={() => loginWithRedirect()}>Log In</button>}
    </>
  );
};
export default Page;
