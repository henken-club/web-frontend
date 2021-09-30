import {
  AllHenkenPagesQuery,
  AllHenkenPagesQueryVariables,
  HenkenPageQuery,
  HenkenPageQueryVariables,
} from '../codegen';

import {
  alias,
  avatar,
  bookCover,
  comment,
  displayName,
  id,
  repeat,
  title,
  which,
} from './common';

export const factoryAllHenkenPages = ({
  limit,
}: AllHenkenPagesQueryVariables): AllHenkenPagesQuery => ({
  __typename: 'Query',
  manyHenkens: repeat(limit, () => ({
    __typename: 'Henken',
    id: id(),
  })),
});

export const factoryHenkenPage = (
  variables: HenkenPageQueryVariables,
): HenkenPageQuery => ({
  __typename: 'Query',
  findHenken: {
    __typename: 'FindHenkenPayload',
    henken: {
      __typename: 'Henken',
      id: variables.id,
      comment: comment(),
      postsTo: {
        __typename: 'User',
        id: id(),
        alias: alias(),
        displayName: displayName(),
        avatar: avatar(),
      },
      postedBy: {
        __typename: 'User',
        id: id(),
        alias: alias(),
        displayName: displayName(),
        avatar: avatar(),
      },
      content: which([
        {
          __typename: 'Book',
          id: id(),
          title: title(),
          cover: bookCover(),
        },
        {
          __typename: 'BookSeries',
          id: id(),
          title: title(),
        },
      ]),
    },
  },
});
