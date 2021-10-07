import {useAuth0} from '@auth0/auth0-react';
import React from 'react';

export const RegisterForm: React.VFC = () => {
  const {user} = useAuth0();

  return (
    <div>
      <p>input!</p>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};
