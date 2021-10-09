import {atom, useRecoilValue, useSetRecoilState} from 'recoil';
import React from 'react';

import {RegisterForm} from '.';

export const visibilityRegisterFormState = atom<boolean>({
  key: 'register_form_visibility',
  default: false,
});

export const useShowRegisterForm = (): (() => void) => {
  const recoilSetter = useSetRecoilState(visibilityRegisterFormState);
  return () => recoilSetter(true);
};

export const useHiddenRegisterForm = (): (() => void) => {
  const recoilSetter = useSetRecoilState(visibilityRegisterFormState);
  return () => recoilSetter(false);
};

export const Register = () => {
  const visibility = useRecoilValue(visibilityRegisterFormState);

  if (!visibility) return <></>;
  return <RegisterForm />;
};
