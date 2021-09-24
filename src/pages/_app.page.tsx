import React from 'react';
import {AppProps} from 'next/app';
import {config as FontAwesomeConfig} from '@fortawesome/fontawesome-svg-core';
import {Provider as UrqlProvider} from 'urql';

import {localeDetector} from '~/i18n/detector';
import TypesafeI18n from '~/i18n/i18n-react';
import {createUrqlClient} from '~/libs/urql';

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

  const urqlClient = createUrqlClient();

  return (
    <UrqlProvider value={urqlClient}>
      <TypesafeI18n initialLocale={detectedLocales}>
        <Component {...pageProps} />
      </TypesafeI18n>
    </UrqlProvider>
  );
};

export default App;
