import {
  AllUserPagesQuery,
  AllUserPagesQueryVariables,
  UserPageQuery,
  UserPageQueryVariables,
} from '../codegen';

import {
  alias,
  answerType,
  authorName,
  avatar,
  boolean,
  comment,
  displayName,
  hasNextPage,
  id,
  repeat,
  title,
  totalCount,
  which,
} from './common';

import {
  UserPageWithViewerQuery,
  UserPageWithViewerQueryVariables,
} from '~/components/codegen';

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
): UserPageQuery => {
  return {
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
                content: which([
                  {
                    __typename: 'Author',
                    id: id(),
                    name: authorName(),
                  },
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
                postsTo: {
                  __typename: 'User',
                  id: id(),
                  alias: alias(),
                  displayName: displayName(),
                  avatar: avatar(),
                },
                answer: which([
                  {
                    __typename: 'Answer',
                    id: id(),
                    comment: comment(),
                    type: answerType(),
                  },
                  null,
                ]),
              },
            },
          ],
        },
        postsAnswers: {
          __typename: 'AnswerConnection',
          totalCount: totalCount(),
          pageInfo: {
            __typename: 'PageInfo',
            hasNextPage: hasNextPage(),
          },
          edges: [
            {
              __typename: 'AnswerEdge',
              node: {
                __typename: 'Answer',
                id: id(),
                comment: comment(),
                type: answerType(),
                henken: {
                  __typename: 'Henken',
                  id: id(),
                  comment: comment(),
                  content: which([
                    {
                      __typename: 'Author',
                      id: id(),
                      name: authorName(),
                    },
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
                  postsTo: {
                    __typename: 'User',
                    id: id(),
                    alias: alias(),
                    displayName: displayName(),
                    avatar: avatar(),
                  },
                },
              },
            },
          ],
        },
      },
    },
  };
};

export const factoryUserPageWithViewer = (
  variables: UserPageWithViewerQueryVariables,
): UserPageWithViewerQuery => ({
  __typename: 'Query',
  viewer: {
    __typename: 'User',
    isFollowing: boolean(),
    isFollowed: boolean(),
    canPostHenken: boolean(),
  },
});
