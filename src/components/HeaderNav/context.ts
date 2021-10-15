import React from 'react';

import {Viewer} from '~/auth/useViewer';

export const HeaderNavContext = React.createContext<
  & {callLogin(): void; callRegister(): void;}
  & (
    | {authenticated: false;}
    | {authenticated: true; viewer: undefined;}
    | {authenticated: true; viewer: null;}
    | {authenticated: true; viewer: Viewer;}
  )
>({
  callLogin: () => {},
  callRegister: () => {},
  authenticated: false,
});
