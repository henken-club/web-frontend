import {graphql, GraphQLHandler} from 'msw';
import faker from 'faker';

import {
  AnswerType,
  UserPageDocument,
  UserPageQuery,
  UserPageQueryVariables,
} from './codegen';
import {factoryUser, factoryUserEdge} from './factories';

import {
  GetViewerQuery,
  GetViewerQueryVariables,
  GetViewerDocument,
} from '~/libs/codegen';

const devMocks: GraphQLHandler[] = [
  graphql.query<GetViewerQuery, GetViewerQueryVariables>(
    GetViewerDocument,
    (req, res, ctx) => {
      if (req.headers.get('Authorization'))
        return res(
          ctx.data({
            __typename: 'Query',
            viewer: {
              __typename: 'User',
              id: faker.datatype.uuid(),
              alias: faker.hacker.ingverb(),
              displayName: faker.name.firstName(),
            },
          }),
        );
      else
        return res(
          ctx.data({
            __typename: 'Query',
            viewer: null,
          }),
        );
    },
  ),
  graphql.query<UserPageQuery, UserPageQueryVariables>(
    UserPageDocument,
    (req, res, ctx) => {
      return res.once(
        ctx.data({
          __typename: 'Query',
          findUser: {
            __typename: 'FindUserPayload',
            user: {
              __typename: 'User',
              id: faker.datatype.uuid(),
              alias: req.variables.alias,
              displayName: faker.name.firstName(),
              avatar: faker.image.avatar(),
              followees: {
                __typename: 'UserConnection',
                totalCount: faker.datatype.number(),
                pageInfo: {
                  __typename: 'PageInfo',
                  hasNextPage: faker.datatype.boolean(),
                },
                edges: [...new Array(10)].map(() => factoryUserEdge()),
              },
              followers: {
                __typename: 'UserConnection',
                totalCount: faker.datatype.number(),
                pageInfo: {
                  __typename: 'PageInfo',
                  hasNextPage: faker.datatype.boolean(),
                },
                edges: [...new Array(10)].map(() => factoryUserEdge()),
              },
              postsHenkens: {
                __typename: 'HenkenConnection',
                totalCount: faker.datatype.number(),
                pageInfo: {
                  __typename: 'PageInfo',
                  hasNextPage: faker.datatype.boolean(),
                },
                edges: [
                  {
                    __typename: 'HenkenEdge',
                    node: {
                      __typename: 'Henken',
                      id: faker.datatype.uuid(),
                      comment: faker.lorem.sentence(),
                      content: {
                        __typename: 'Book',
                        id: faker.datatype.uuid(),
                        title: faker.lorem.words(),
                      },
                      postsTo: {
                        __typename: 'User',
                        id: faker.datatype.uuid(),
                        alias: faker.hacker.ingverb(),
                        displayName: faker.name.firstName(),
                        avatar: faker.image.avatar(),
                      },
                      answer: {
                        __typename: 'Answer',
                        id: faker.datatype.uuid(),
                        comment: faker.lorem.sentence(),
                        type: AnswerType.Right,
                      },
                    },
                  },
                ],
              },
              receivedHenkens: {
                __typename: 'HenkenConnection',
                totalCount: faker.datatype.number(),
                pageInfo: {
                  __typename: 'PageInfo',
                  hasNextPage: faker.datatype.boolean(),
                },
                edges: [
                  {
                    __typename: 'HenkenEdge',
                    node: {
                      __typename: 'Henken',
                      id: faker.datatype.uuid(),
                      comment: faker.lorem.sentence(),
                      content: {
                        __typename: 'Book',
                        id: faker.datatype.uuid(),
                        title: faker.lorem.words(),
                      },
                      postedBy: factoryUser(),
                      answer: {
                        __typename: 'Answer',
                        id: faker.datatype.uuid(),
                        comment: faker.lorem.sentence(),
                        type: AnswerType.Right,
                      },
                    },
                  },
                ],
              },
            },
          },
        }),
      );
    },
  ),
];

export const handlers =
  // eslint-disable-next-line no-process-env
  process.env.NODE_ENV === 'development' ? devMocks : [];
