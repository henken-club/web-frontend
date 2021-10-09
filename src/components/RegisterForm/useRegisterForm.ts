import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

export const visibilityRegisterFormState = atom<boolean>({
  key: 'register_form_visibility',
  default: false,
});

export const useRegisterForm = () => {
  const visibility = useRecoilValue(visibilityRegisterFormState);
  const recoilSetter = useSetRecoilState(visibilityRegisterFormState);
  return {
    visibility,
    show: () => recoilSetter(true),
    hide: () => recoilSetter(false),
  };
};
