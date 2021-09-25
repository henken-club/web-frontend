import {act, renderHook, WrapperComponent} from '@testing-library/react-hooks';
import {RecoilRoot} from 'recoil';
import React from 'react';

import {useViewer} from './useViewer';

const RecoilWrapper: WrapperComponent<unknown> = ({children}) => (
  <RecoilRoot>
    <>{children}</>
  </RecoilRoot>
);

describe('useViewer', () => {
  it('初期状態はundefined', () => {
    const {result} = renderHook(
      () => {
        const {viewer, setter} = useViewer();
        return {viewer, setter};
      },
      {wrapper: RecoilWrapper},
    );
    expect(result.current.viewer).toBeUndefined();
  });

  it('未ログイン', () => {
    const {result} = renderHook(
      () => {
        const {viewer, setter} = useViewer();
        return {viewer, setter};
      },
      {wrapper: RecoilWrapper},
    );

    act(() => {
      result.current.setter(null);
    });

    expect(result.current.viewer).toBeNull();
  });

  it('ログイン済み', () => {
    const {result} = renderHook(
      () => {
        const {viewer, setter} = useViewer();
        return {viewer, setter};
      },
      {wrapper: RecoilWrapper},
    );

    act(() => {
      result.current.setter({
        id: 'id',
        alias: 'alias',
        displayName: 'displayName',
      });
    });

    expect(result.current.viewer).toStrictEqual({
      id: 'id',
      alias: 'alias',
      displayName: 'displayName',
    });
  });
});
