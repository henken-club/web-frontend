import {WrapperComponent} from '@testing-library/react-hooks';
import React from 'react';
import {RecoilRoot} from 'recoil';

export const RecoilWrapper: WrapperComponent<unknown> = ({children}) => (
  <RecoilRoot>
    <>{children}</>
  </RecoilRoot>
);
