import {NextPage} from 'next';
import React from 'react';
import Link from 'next/link';

import {useViewer} from '~/libs/useViewer';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;

export const Page: NextPage<PageProps> = ({...props}) => {
  const {viewer} = useViewer();

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
    </>
  );
};
export default Page;
