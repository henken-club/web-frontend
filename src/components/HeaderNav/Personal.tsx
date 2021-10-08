import {useAuth0} from '@auth0/auth0-react';
import React from 'react';

import {useViewer} from '~/auth/useViewer';
import {useTranslation} from '~/i18n/useTranslation';

export const YouMustLoginAuth0: React.VFC = () => {
  const {LL} = useTranslation();
  const {loginWithRedirect} = useAuth0();
  return (
    <button type="button" onClick={() => loginWithRedirect()}>
      {LL.Login()}
    </button>
  );
};

export const YouMustRegister: React.VFC = () => {
  return <></>;
};

export const YouMustWait: React.VFC = () => {
  return <></>;
};

export const YourAvatar: React.VFC = () => {
  return <></>;
};

export const Personal: React.VFC = () => {
  const {isAuthenticated} = useAuth0();
  const viewer = useViewer();

  if (isAuthenticated) return <YouMustLoginAuth0 />;
  else if (viewer === null) return <YouMustRegister />;
  else if (viewer === undefined) return <YouMustWait />;
  return (
    <>
      <YourAvatar />
    </>
  );
};
