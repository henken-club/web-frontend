import clsx from 'clsx';
import React, {useMemo, useState} from 'react';

import {HeaderNavContext} from './context';
import {Personal} from './Personal';

import {useAuth} from '~/auth/useAuth';
import {useViewer} from '~/auth/useViewer';
import {SearchBox} from '~/components/HeaderNav/SearchBox';
import {LinkIndex} from '~/components/Link';
import {useRegisterForm} from '~/components/RegisterForm/useRegisterForm';
import {useTranslation} from '~/i18n/useTranslation';

export type ComponentProps = {className?: string; focusing: boolean;};
export const Component: React.VFC<ComponentProps> = (
  {className, focusing},
) => {
  const {LL} = useTranslation();

  return (
    <nav className={clsx(className, ['h-16'], ['bg-gray-100'], ['shadow-lg'])}>
      <div
        className={clsx(
          ['fixed', 'inset-0', 'z-0'],
          [{hidden: !focusing}],
          ['bg-black', ['bg-opacity-25']],
        )}
      />
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
  const [focus, setFocus] = useState(false);
  const viewer = useViewer();

  const value = useMemo<React.ContextType<typeof HeaderNavContext>>(() => {
    return {
      ...isAuthenticated
        ? ({authenticated: true, viewer} as const)
        : {authenticated: false} as const,
      callLogin: loginWithRedirect,
      callRegister: showRegisterForm,
      onFocus: () => {
        setFocus(true);
      },
      onBlur: () => {
        setFocus(false);
      },
    };
  }, [isAuthenticated, loginWithRedirect, showRegisterForm, viewer]);

  return (
    <HeaderNavContext.Provider value={value}>
      <Component focusing={focus} />
    </HeaderNavContext.Provider>
  );
};
