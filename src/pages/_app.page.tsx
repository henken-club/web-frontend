/* eslint-disable no-process-env */
import React from 'react';
import {AppProps} from 'next/app';
import {RecoilRoot} from 'recoil';

import {AuthProvider} from '~/auth/AuthProvider';
import {localeDetector} from '~/i18n/detector';
import TypesafeI18n from '~/i18n/i18n-react';
import {UrqlProvider} from '~/urql/UrqlProvider';
import {Viewer} from '~/auth/AuthManager';
import {DefaultLayout} from '~/components/Layout';
import {RegisterFormManager} from '~/components/RegisterForm/Manager';

import '~/styles/index.css';

if (process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') require('../mocks/next');

const App = ({
  Component,
  pageProps: {session, ...pageProps},
  router,
}: AppProps) => {
  const detectedLocales = localeDetector(router);

  const PageLayout = DefaultLayout;

  return (
    <AuthProvider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
    >
      <RecoilRoot>
        <UrqlProvider>
          <TypesafeI18n initialLocale={detectedLocales}>
            <Viewer />
            <RegisterFormManager />
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
          </TypesafeI18n>
        </UrqlProvider>
      </RecoilRoot>
    </AuthProvider>
  );
};

export default App;
