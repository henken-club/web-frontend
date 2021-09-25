import {WrapperComponent} from '@testing-library/react-hooks';
import {RecoilRoot} from 'recoil';
import React from 'react';

export const RecoilWrapper: WrapperComponent<unknown> = ({children}) => (
  <RecoilRoot>
    <>{children}</>
  </RecoilRoot>
);
