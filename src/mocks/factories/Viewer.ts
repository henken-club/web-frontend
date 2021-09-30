import {GetViewerQuery} from '../codegen';

import {alias, displayName, id} from './common';

export const factoryUnauthorizedViewer = (): GetViewerQuery => ({
  __typename: 'Query',
  viewer: null,
});

export const factoryAuthorizedViewer = (): GetViewerQuery => ({
  __typename: 'Query',
  viewer: {
    __typename: 'User',
    id: id(),
    alias: alias(),
    displayName: displayName(),
  },
});
