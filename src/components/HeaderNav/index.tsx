import clsx from 'clsx';
import React, {useMemo} from 'react';

import {HeaderNavContext} from './context';
import {Personal} from './Personal';

import {useAuth} from '~/auth/useAuth';
import {useViewer} from '~/auth/useViewer';
import {LinkIndex} from '~/components/Link';
import {useRegisterForm} from '~/components/RegisterForm/useRegisterForm';
import {SearchBox} from '~/components/SearchBox';
import {useTranslation} from '~/i18n/useTranslation';

export type ComponentProps = {className?: string;};
export const Component: React.VFC<ComponentProps> = ({className}) => {
  const {LL} = useTranslation();

  return (
    <nav className={clsx(className, ['h-16'], ['bg-gray-100'], ['shadow-lg'])}>
      <div
        className={clsx(
          ['h-full'],
          ['container'],
          ['mx-auto'],
          [['flex'], ['items-center']],
        )}
      >
        <LinkIndex>
          <span
            className={clsx('block', [['text-black'], ['text-lg'], ['italic']])}
          >
            {LL.Brand.Name()}
          </span>
        </LinkIndex>
        <div className={clsx(['flex-grow'], ['mx-4'])}>
          <SearchBox className={clsx('w-full')} />
        </div>
        <Personal className={clsx(['w-32'])} />
      </div>
    </nav>
  );
};

export const HeaderNav: React.VFC<{className?: string;}> = ({className}) => {
  const {loginWithRedirect, isAuthenticated} = useAuth();
  const {show: showRegisterForm} = useRegisterForm();
  const viewer = useViewer();

  const value = useMemo<React.ContextType<typeof HeaderNavContext>>(() => {
    return {
      ...isAuthenticated
        ? ({authenticated: true, viewer} as const)
        : {authenticated: false} as const,
      callLogin: loginWithRedirect,
      callRegister: showRegisterForm,
    };
  }, [isAuthenticated, loginWithRedirect, showRegisterForm, viewer]);

  return (
    <HeaderNavContext.Provider value={value}>
      <Component />
    </HeaderNavContext.Provider>
  );
};
