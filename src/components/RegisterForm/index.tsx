import React from 'react';

import {useAuth} from '~/auth/useAuth';

export const RegisterForm: React.VFC = () => {
  const {user} = useAuth();

  return (
    <>
      <p>input!</p>
      <p>{JSON.stringify(user)}</p>
    </>
  );
};
