import clsx from 'clsx';
import React from 'react';

import {HeaderNav} from '~/components/HeaderNav';

export const DefaultLayout: React.FC = ({children}) => (
  <main className={clsx(['flex', 'flex-col'], ['min-h-screen'])}>
    <HeaderNav className={clsx(['sticky'], ['w-full'])} />
    <section className={clsx('container', 'mx-auto', ['py-8'])}>
      {children}
    </section>
  </main>
);
