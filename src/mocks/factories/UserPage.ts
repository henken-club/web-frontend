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
  createdAt,
  displayName,
  hasNextPage,
  id,
  repeat,
  title,
  totalCount,
  which,
} from './common';

export const factoryAllUserPages = (
  variables: AllUserPagesQueryVariables,
): AllUserPagesQuery => ({
  __typename: 'Query',
  manyUsers: repeat(variables.limit, () => ({
    __typename: 'User',
    id: id(),
    alias: alias(),
  })),
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
        __typename: 'UserConnection',
        totalCount: totalCount(),
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: hasNextPage(),
        },
        edges: repeat(10, () => ({
          __typename: 'UserEdge',
          node: {
            __typename: 'User',
            id: id(),
            alias: alias(),
            avatar: avatar(),
          },
        })),
      },
      followers: {
        __typename: 'UserConnection',
        totalCount: totalCount(),
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: hasNextPage(),
        },
        edges: repeat(10, () => ({
          __typename: 'UserEdge',
          node: {
            __typename: 'User',
            id: id(),
            alias: alias(),
            avatar: avatar(),
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
      activities: {
        __typename: 'UserActivityConnection',
        pageInfo: {
          __typename: 'PageInfo',
          hasNextPage: hasNextPage(),
          endCursor: which([id(), null]),
        },
        edges: [...new Array(10)].map((_, i) => ({
          __typename: 'UserActivityEdge',
          node: {
            __typename: 'UserActivity',
            id: id(),
            event: which([
              {
                __typename: 'Henken',
                id: id(),
                createdAt: createdAt(),
                comment: comment(),
                content: which([
                  {
                    __typename: 'Book',
                    id: id(),
                    title: title(),
                  },
                  {
                    __typename: 'BookSeries',
                    id: id(),
                    title: title(),
                  },
                ]),
                postedBy: {
                  __typename: 'User',
                  id: id(),
                  alias: alias(),
                  displayName: displayName(),
                  avatar: avatar(),
                },
              },
              {
                __typename: 'Answer',
                id: id(),
                createdAt: createdAt(),
                comment: comment(),
                type: answerType(),
                answerTo: {
                  __typename: 'Henken',
                  id: id(),
                  createdAt: createdAt(),
                  comment: comment(),
                  content: which([
                    {
                      __typename: 'Book',
                      id: id(),
                      title: title(),
                    },
                    {
                      __typename: 'BookSeries',
                      id: id(),
                      title: title(),
                    },
                  ]),
                  postedBy: {
                    __typename: 'User',
                    id: id(),
                    alias: alias(),
                    displayName: displayName(),
                    avatar: avatar(),
                  },
                },
              },
            ]),
          },
        })),
      },
    },
  },
});
