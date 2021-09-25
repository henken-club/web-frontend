import {NextPage} from 'next';
import React from 'react';

import {useTranslation} from '~/i18n/useTranslation';
import {useViewer} from '~/libs/useViewer';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;

export const Page: NextPage<PageProps> = ({...props}) => {
  const {LL} = useTranslation();

  const {viewer} = useViewer();

  return (
    <>
      <p>IndexPage</p>
      {viewer && (
        <>
          <p>{viewer.id}</p>
          <p>{viewer.alias}</p>
          <p>{viewer.displayName}</p>
        </>
      )}
    </>
  );
};
export default Page;
