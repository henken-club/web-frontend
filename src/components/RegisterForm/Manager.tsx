import {atom, useRecoilValue, useSetRecoilState} from 'recoil';
import React from 'react';
import clsx from 'clsx';

import {RegisterForm} from '.';

export const visibilityRegisterFormState = atom<boolean>({
  key: 'register_form_visibility',
  default: false,
});

export const useRegisterFormVisibility = () =>
  useRecoilValue(visibilityRegisterFormState);

export const useShowRegisterForm = (): (() => void) => {
  const recoilSetter = useSetRecoilState(visibilityRegisterFormState);
  return () => recoilSetter(true);
};

export const useHideRegisterForm = (): (() => void) => {
  const recoilSetter = useSetRecoilState(visibilityRegisterFormState);
  return () => recoilSetter(false);
};

export const RegisterFormManager: React.VFC = () => {
  const visibility = useRegisterFormVisibility();
  const hide = useHideRegisterForm();

  if (!visibility) return <></>;
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
