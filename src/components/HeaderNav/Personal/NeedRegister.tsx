import clsx from 'clsx';
import React from 'react';

import {ButtonNormal} from '~/components/Button';
import {IconRegister} from '~/components/Icon';
import {useTranslation} from '~/i18n/useTranslation';

export const RegisterButton: React.VFC<{
  className?: string;
  callLogin(): void;
}> = ({callLogin, ...props}) => {
  const {LL} = useTranslation();
  return (
    <ButtonNormal
      {...props}
      onClick={callLogin}
      icon={IconRegister}
      text={LL.HeaderNav.NeedRegister()}
    />
  );
};

export const Component: React.VFC<{className?: string; callLogin(): void;}> = ({
  className,
  callLogin,
}) => (
  <div className={clsx(className, ['inline-flex', ['justify-center']])}>
    <RegisterButton callLogin={callLogin} />
  </div>
);
export const NeedToRegister = Component;
