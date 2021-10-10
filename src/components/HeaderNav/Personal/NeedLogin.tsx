import React from 'react';
import clsx from 'clsx';

import {useTranslation} from '~/i18n/useTranslation';
import {ButtonNormal} from '~/components/Button';
import {IconSignIn} from '~/components/Icon';

export const LoginButton: React.VFC<{className?: string; login(): void}> = ({
  login: callLogin,
  ...props
}) => {
  const {LL} = useTranslation();
  return (
    <ButtonNormal
      {...props}
      onClick={callLogin}
      icon={IconSignIn}
      text={LL.Login()}
    />
  );
};

export const Component: React.VFC<{className?: string; callLogin(): void}> = ({
  className,
  callLogin,
}) => (
  <div className={clsx(className, ['inline-flex', ['justify-center']])}>
    <LoginButton login={callLogin} />
  </div>
);

export const NeedLogin = Component;
