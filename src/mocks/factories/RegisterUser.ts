import {RegisterUserMutation, RegisterUserMutationVariables} from '../codegen';

import {id} from './common';

export function factoryRegisterUser(
  variables: RegisterUserMutationVariables,
): RegisterUserMutation {
  return {
    __typename: 'Mutation',
    registerUser: {
      __typename: 'RegisterUserPayload',
      user: {__typename: 'User', id: id(), ...variables},
    },
  };
}
