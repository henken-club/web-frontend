import {FetchViewerQuery} from '../codegen';

import {alias, avatar, displayName, id} from './common';

export const factoryUnauthorizedViewer = (): FetchViewerQuery => ({
  __typename: 'Query',
  viewer: null,
});

export const factoryAuthorizedViewer = (): FetchViewerQuery => ({
  __typename: 'Query',
  viewer: {
    __typename: 'User',
    id: id(),
    alias: alias(),
    displayName: displayName(),
    avatar: avatar(),
  },
});
