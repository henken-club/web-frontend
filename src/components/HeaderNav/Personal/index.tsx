import React, {useContext} from 'react';

import {HeaderNavContext} from '../context';

import {Fetching} from './Fetching';
import {NeedLogin} from './NeedLogin';
import {NeedToRegister} from './NeedRegister';
import {Registered} from './Registered';

export const Personal: React.VFC<{className?: string;}> = (props) => {
  const {
    callLogin: login,
    callRegister: register,
    ...state
  } = useContext(HeaderNavContext);

  if (!state.authenticated)
    return <NeedLogin {...props} callLogin={login} />;
  else if (state.viewer === undefined)
    return <Fetching {...props} />;
  else if (state.viewer === null)
    return <NeedToRegister {...props} callLogin={register} />;
  else
    return <Registered {...props} viewer={state.viewer} />;
};
