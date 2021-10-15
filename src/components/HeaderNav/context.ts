import React from 'react';

import {Viewer} from '~/auth/useViewer';

export const HeaderNavContext = React.createContext<
  & {onFocus(): void; onBlur(): void; callLogin(): void; callRegister(): void;}
  & (
    | {authenticated: false;}
    | {authenticated: true; viewer: undefined;}
    | {authenticated: true; viewer: null;}
    | {authenticated: true; viewer: Viewer;}
  )
>({
  onFocus() {},
  onBlur() {},
  callLogin: () => {},
  callRegister: () => {},
  authenticated: false,
});
