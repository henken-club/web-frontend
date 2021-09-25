import React from 'react';
import {AppProps} from 'next/app';
import {config as FontAwesomeConfig} from '@fortawesome/fontawesome-svg-core';
import {RecoilRoot} from 'recoil';

import {localeDetector} from '~/i18n/detector';
import TypesafeI18n from '~/i18n/i18n-react';
import {UrqlProvider} from '~/urql/UrqlProvider';
import {Viewer} from '~/libs/Viewer';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '~/styles/index.css';

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === 'development') require('../mocks');

FontAwesomeConfig.autoAddCss = false;

const App = ({
  Component,
  pageProps: {session, ...pageProps},
  router,
}: AppProps) => {
  const detectedLocales = localeDetector(router);

  return (
    <RecoilRoot>
      <UrqlProvider>
        <Viewer />
        <TypesafeI18n initialLocale={detectedLocales}>
          <Component {...pageProps} />
        </TypesafeI18n>
      </UrqlProvider>
    </RecoilRoot>
  );
};

export default App;
