import clsx from 'clsx';
import React from 'react';

import {HeaderNav} from '~/components/HeaderNav';

export const PageContainer: React.FC<{className?: string;}> = ({
  children,
  className,
}) => (
  <div className={clsx(className, ['container', ['mx-auto']])}>
    {children}
  </div>
);

export const DefaultLayout: React.FC = ({children}) => (
  <main
    className={clsx(['flex', 'flex-col'], ['min-h-screen'], ['bg-gray-50'])}
  >
    <HeaderNav className={clsx(['sticky'], ['w-full'])} />
    <PageContainer className={clsx()}>{children}</PageContainer>
  </main>
);
