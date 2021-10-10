import {SearchBoxQuery, SearchBoxQueryVariables} from '../codegen';

import {authorName, between, id, repeat, title, which} from './common';

export function factorySearchBox(
  variables: SearchBoxQueryVariables,
): SearchBoxQuery {
  return {
    __typename: 'Query',
    search: {
      __typename: 'SearchPayload',
      nodes: repeat(between(0, 5), () => ({
        __typename: 'SearchResult',
        content: which([
          {__typename: 'Author', id: id(), name: authorName()},
          {
            __typename: 'Book',
            id: id(),
            title: title(),
            writings: {
              __typename: 'WritingConnection',
              edges: repeat(between(1, 4), () => ({
                __typename: 'WritingEdge',
                node: {
                  __typename: 'Writing',
                  author: {
                    __typename: 'Author',
                    id: id(),
                    name: authorName(),
                  },
                },
              })),
            },
          },
          {__typename: 'BookSeries', id: id(), title: title()},
        ]),
      })),
    },
  };
}
