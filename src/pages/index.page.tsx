import {NextPage} from 'next';
import React from 'react';

import {useTranslation} from '~/i18n/useTranslation';

export type UrlQuery = Record<string, never>;
export type PageProps = Record<string, never>;

export const Page: NextPage<PageProps> = ({...props}) => {
  const {LL} = useTranslation();

  return (
    <>
      <p>IndexPage</p>
    </>
  );
};
export default Page;
