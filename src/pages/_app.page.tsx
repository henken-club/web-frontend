/* eslint-disable no-process-env */
import React from 'react';
import {AppProps} from 'next/app';
import {config as FontAwesomeConfig} from '@fortawesome/fontawesome-svg-core';
import {RecoilRoot} from 'recoil';
import {Auth0Provider} from '@auth0/auth0-react';

import {localeDetector} from '~/i18n/detector';
import TypesafeI18n from '~/i18n/i18n-react';
import {UrqlProvider} from '~/urql/UrqlProvider';
import {Viewer} from '~/libs/Viewer';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '~/styles/index.css';

if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') require('../mocks/next');

FontAwesomeConfig.autoAddCss = false;

const App = ({
  Component,
  pageProps: {session, ...pageProps},
  router,
}: AppProps) => {
  const detectedLocales = localeDetector(router);

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
    >
      <RecoilRoot>
        <UrqlProvider>
          <Viewer />
          <TypesafeI18n initialLocale={detectedLocales}>
            <Component {...pageProps} />
          </TypesafeI18n>
        </UrqlProvider>
      </RecoilRoot>
    </Auth0Provider>
  );
};

export default App;
