import {SearchBoxQuery, SearchBoxQueryVariables} from '../codegen';

import {authorName, id, repeat, title, which} from './common';

export function factoryRegisterUser(
  variables: SearchBoxQueryVariables,
): SearchBoxQuery {
  return {
    __typename: 'Query',
    search: {
      __typename: 'SearchPayload',
      nodes: repeat(5, () => ({
        __typename: 'SearchResult',
        content: which([
          {__typename: 'Book', id: id(), title: title()},
          {__typename: 'BookSeries', id: id(), title: title()},
          {__typename: 'Author', id: id(), name: authorName()},
        ]),
      })),
    },
  };
}
