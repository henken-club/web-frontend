import {
  AllUserPagesQuery,
  AllUserPagesQueryVariables,
  UserPageQuery,
  UserPageQueryVariables,
} from '../codegen';

import {
  alias,
  answerType,
  avatar,
  comment,
  displayName,
  hasNextPage,
  id,
  repeat,
  title,
  totalCount,
} from './common';

export const factoryAllUserPages = ({
  limit,
}: AllUserPagesQueryVariables): AllUserPagesQuery => ({
  __typename: 'Query',
  manyUsers: {
    __typename: 'UserConnection',
    edges: repeat(limit, () => ({
      __typename: 'UserEdge',
      node: {
        __typename: 'User',
        id: id(),
        alias: alias(),
      },
    })),
  },
});

export const factoryUserPage = (
  variables: UserPageQueryVariables,
): UserPageQuery => ({
  __typename: 'Query',
  findUser: {
    __typename: 'FindUserPayload',
    user: {
      __typename: 'User',
      id: id(),
      alias: variables.alias,
      displayName: displayName(),
      avatar: avatar(),
      followees: {
        __typename: 'FollowingConnection',
        totalCount: totalCount(),
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: hasNextPage(),
        },
        edges: repeat(10, () => ({
          __typename: 'FollowingEdge',
          node: {
            __typename: 'Following',
            user: {
              __typename: 'User',
              id: id(),
              alias: alias(),
              avatar: avatar(),
            },
          },
        })),
      },
      followers: {
        __typename: 'FollowingConnection',
        totalCount: totalCount(),
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: hasNextPage(),
        },
        edges: repeat(10, () => ({
          __typename: 'FollowingEdge',
          node: {
            __typename: 'Following',
            user: {
              __typename: 'User',
              id: id(),
              alias: alias(),
              avatar: avatar(),
            },
          },
        })),
      },
      postsHenkens: {
        __typename: 'HenkenConnection',
        totalCount: totalCount(),
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: hasNextPage(),
        },
        edges: [
          {
            __typename: 'HenkenEdge',
            node: {
              __typename: 'Henken',
              id: id(),
              comment: comment(),
              content: {
                __typename: 'Book',
                id: id(),
                title: title(),
              },
              postsTo: {
                __typename: 'User',
                id: id(),
                alias: alias(),
                displayName: displayName(),
                avatar: avatar(),
              },
              answer: {
                __typename: 'Answer',
                id: id(),
                comment: comment(),
                type: answerType(),
              },
            },
          },
        ],
      },
      receivedHenkens: {
        __typename: 'HenkenConnection',
        totalCount: totalCount(),
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: hasNextPage(),
        },
        edges: [
          {
            __typename: 'HenkenEdge',
            node: {
              __typename: 'Henken',
              id: id(),
              comment: comment(),
              content: {
                __typename: 'Book',
                id: id(),
                title: title(),
              },
              postedBy: {
                __typename: 'User',
                id: id(),
                alias: alias(),
                displayName: displayName(),
                avatar: avatar(),
              },
              answer: {
                __typename: 'Answer',
                id: id(),
                comment: comment(),
                type: answerType(),
              },
            },
          },
        ],
      },
    },
  },
});