import crypto from 'crypto';

import {graphql} from 'msw';
import * as faker from 'faker';

import {
  factoryAllAnswerPagesQuery,
  factoryAnswerPageQuery,
} from '../factories/AnswerPage';
import {
  AllUserPagesDocument,
  AllUserPagesQuery,
  AllUserPagesQueryVariables,
  AnswerType,
  UserPageDocument,
  UserPageQuery,
  UserPageQueryVariables,
  GetViewerQuery,
  GetViewerQueryVariables,
  GetViewerDocument,
  AllHenkenPagesQuery,
  AllHenkenPagesQueryVariables,
  AllHenkenPagesDocument,
  HenkenPageDocument,
  HenkenPageQuery,
  HenkenPageQueryVariables,
  RecommendationPageQuery,
  RecommendationPageQueryVariables,
  RecommendationPageDocument,
  AllRecommendationsPagesDocument,
  AllRecommendationsPagesQuery,
  AllRecommendationsPagesQueryVariables,
  AnswerPageQuery,
  AnswerPageQueryVariables,
  AnswerPageDocument,
  AllAnswerPagesQuery,
  AllAnswerPagesQueryVariables,
  AllAnswerPagesDocument,
} from '../codegen';
import {
  factoryAllRecommendationsPage,
  factoryRecommendationPage,
} from '../factories/RecommendationPage';

import {factoryUser, factoryUserEdge} from './factories';

const generateSeed = (variables: Record<string, unknown>) =>
  Number.parseInt(
    crypto
      .createHash('md5')
      .update(JSON.stringify(variables))
      .digest('hex')
      .substr(0, 8),
    16,
  );

export const handlers = [
  graphql.query<GetViewerQuery, GetViewerQueryVariables>(
    GetViewerDocument,
    (req, res, ctx) => {
      faker.seed(0);
      if (req.headers.get('Authorization'))
        return res(
          ctx.data({
            __typename: 'Query',
            viewer: {
              __typename: 'User',
              id: faker.datatype.uuid(),
              alias: faker.random.alphaNumeric(10),
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
  graphql.query<AllUserPagesQuery, AllUserPagesQueryVariables>(
    AllUserPagesDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(
        ctx.data({
          __typename: 'Query',
          manyUsers: [...new Array(1)].map((_, i) => ({
            __typename: 'User',
            id: faker.datatype.uuid(),
            alias: faker.random.alphaNumeric(10),
          })),
        }),
      );
    },
  ),
  graphql.query<UserPageQuery, UserPageQueryVariables>(
    UserPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(
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
                        alias: faker.random.alphaNumeric(10),
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
              activities: {
                __typename: 'UserActivityConnection',
                pageInfo: {
                  __typename: 'PageInfo',
                  hasNextPage: faker.datatype.boolean(),
                  endCursor: faker.random.arrayElement([
                    faker.datatype.uuid(),
                    null,
                  ]),
                },
                edges: [...new Array(10)].map((_, i) => ({
                  __typename: 'UserActivityEdge',
                  node: {
                    __typename: 'UserActivity',
                    id: faker.datatype.uuid(),
                    event: faker.random.arrayElement([
                      {
                        __typename: 'Henken',
                        id: faker.datatype.uuid(),
                        createdAt: faker.date.past().toISOString(),
                        comment: faker.lorem.sentence(),
                        content: faker.random.arrayElement([
                          {
                            __typename: 'Book' as const,
                            id: faker.datatype.uuid(),
                            title: faker.lorem.words(),
                          },
                          {
                            __typename: 'BookSeries' as const,
                            id: faker.datatype.uuid(),
                            title: faker.lorem.words(),
                          },
                        ]),
                        postedBy: {
                          __typename: 'User' as const,
                          id: faker.datatype.uuid(),
                          alias: faker.random.alphaNumeric(8),
                          displayName: faker.name.findName(),
                          avatar: faker.image.avatar(),
                        },
                      },
                      {
                        __typename: 'Answer',
                        id: faker.datatype.uuid(),
                        createdAt: faker.date.past().toISOString(),
                        comment: faker.lorem.sentence(),
                        type: faker.random.arrayElement([
                          AnswerType.Right,
                          AnswerType.Wrong,
                        ]),
                        answerTo: {
                          __typename: 'Henken',
                          id: faker.datatype.uuid(),
                          createdAt: faker.date.past().toISOString(),
                          comment: faker.lorem.sentence(),
                          content: faker.random.arrayElement([
                            {
                              __typename: 'Book' as const,
                              id: faker.datatype.uuid(),
                              title: faker.lorem.words(),
                            },
                            {
                              __typename: 'BookSeries' as const,
                              id: faker.datatype.uuid(),
                              title: faker.lorem.words(),
                            },
                          ]),
                          postedBy: {
                            __typename: 'User' as const,
                            id: faker.datatype.uuid(),
                            alias: faker.random.alphaNumeric(8),
                            displayName: faker.name.findName(),
                            avatar: faker.image.avatar(),
                          },
                        },
                      },
                    ]),
                  },
                })),
              },
            },
          },
        }),
      );
    },
  ),
  graphql.query<AllHenkenPagesQuery, AllHenkenPagesQueryVariables>(
    AllHenkenPagesDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(
        ctx.data({
          __typename: 'Query',
          manyHenkens: [...new Array(1)].map((_, i) => ({
            __typename: 'Henken',
            id: faker.datatype.uuid(),
          })),
        }),
      );
    },
  ),
  graphql.query<HenkenPageQuery, HenkenPageQueryVariables>(
    HenkenPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(
        ctx.data({
          __typename: 'Query',
          findHenken: {
            __typename: 'FindHenkenPayload',
            henken: {
              __typename: 'Henken',
              id: faker.datatype.uuid(),
              comment: faker.lorem.words(),
              postsTo: factoryUser(),
              postedBy: factoryUser(),
              content: faker.random.arrayElement([
                {
                  __typename: 'Book',
                  id: faker.datatype.uuid(),
                  title: faker.lorem.words(),
                  cover: faker.random.arrayElement([
                    null,
                    faker.image.abstract(),
                  ]),
                },
                {
                  __typename: 'BookSeries',
                  id: faker.datatype.uuid(),
                  title: faker.lorem.words(),
                },
              ]),
            },
          },
        }),
      );
    },
  ),
  graphql.query<
    AllRecommendationsPagesQuery,
    AllRecommendationsPagesQueryVariables
  >(AllRecommendationsPagesDocument, (req, res, ctx) => {
    faker.seed(generateSeed(req.variables));
    return res(ctx.data(factoryAllRecommendationsPage(req.variables)));
  }),
  graphql.query<RecommendationPageQuery, RecommendationPageQueryVariables>(
    RecommendationPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryRecommendationPage(req.variables)));
    },
  ),
  graphql.query<AllAnswerPagesQuery, AllAnswerPagesQueryVariables>(
    AllAnswerPagesDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryAllAnswerPagesQuery(req.variables)));
    },
  ),
  graphql.query<AnswerPageQuery, AnswerPageQueryVariables>(
    AnswerPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryAnswerPageQuery()));
    },
  ),
];
