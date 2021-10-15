import clsx from 'clsx';
import React from 'react';

import {useRegisterForm} from './useRegisterForm';

import {RegisterForm} from '.';

export const RegisterFormManager: React.VFC = () => {
  const {visibility, hide} = useRegisterForm();

  if (!visibility)
    return <></>;

  return (
    <div
      className={clsx(
        ['fixed', ['inset-0']],
        ['flex', ['justify-center', 'items-center']],
        ['z-infinity'],
      )}
    >
      <div
        onKeyPress={hide}
        onClick={hide}
        className={clsx(
          ['absolute', ['inset-0']],
          ['bg-black', ['bg-opacity-25']],
          ['cursor-pointer'],
        )}
      />
      <RegisterForm className={clsx(['m-auto'])} />
    </div>
  );
};
