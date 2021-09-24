import {renderHook, WrapperComponent} from '@testing-library/react-hooks';
import {RecoilRoot} from 'recoil';
import React from 'react';
import {Provider as UrqlProvider} from 'urql';

import {useViewer} from './useViewer';
import {createUrqlClient} from './urql';

import {mockServer} from '~/mocks/server';

describe('useViewer', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(async () => {
    mockServer.close();
  });

  const urqlClient = createUrqlClient();

  const Wrapper: WrapperComponent<unknown> = ({children}) => (
    <UrqlProvider value={urqlClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </UrqlProvider>
  );

  it('初期状態はundefined', () => {
    const {result} = renderHook(() => useViewer(), {
      wrapper: Wrapper,
      initialProps: {},
    });
    expect(result.current).toBeUndefined();
  });
});
