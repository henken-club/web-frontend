import faker from 'faker';

import {AnswerType} from './index.page.codegen';
import {transformer} from './index.transform';

describe('index.transform', () => {
  describe('transformer', () => {
    it('findUser.userがnullならnullを返却', () => {
      const actual = transformer({
        __typename: 'Query',
        findUser: {
          __typename: 'FindUserPayload',
          user: null,
        },
      });
      expect(actual).toBeNull();
    });

    it.each(
      [...new Array(10)].map((_, i) => {
        faker.seed(i);
        return [
          {
            __typename: 'Query' as const,
            findUser: {
              __typename: 'FindUserPayload' as const,
              user: {
                __typename: 'User' as const,
                id: faker.datatype.uuid(),
                alias: faker.random.alphaNumeric(8),
                displayName: faker.name.findName(),
                avatar: faker.image.avatar(),
                followees: {
                  __typename: 'UserConnection' as const,
                  totalCount: faker.datatype.number(),
                  pageInfo: {
                    __typename: 'PageInfo' as const,
                    hasNextPage: faker.datatype.boolean(),
                  },
                  edges: [
                    {
                      __typename: 'UserEdge' as const,
                      node: {
                        __typename: 'User' as const,
                        id: faker.datatype.uuid(),
                        alias: faker.random.alphaNumeric(8),
                        avatar: faker.image.avatar(),
                      },
                    },
                  ],
                },
                followers: {
                  __typename: 'UserConnection' as const,
                  totalCount: faker.datatype.number(),
                  pageInfo: {
                    __typename: 'PageInfo' as const,
                    hasNextPage: faker.datatype.boolean(),
                  },
                  edges: [
                    {
                      __typename: 'UserEdge' as const,
                      node: {
                        __typename: 'User' as const,
                        id: faker.datatype.uuid(),
                        alias: faker.random.alphaNumeric(8),
                        avatar: faker.image.avatar(),
                      },
                    },
                  ],
                },
                postsHenkens: {
                  __typename: 'HenkenConnection' as const,
                  totalCount: faker.datatype.number(),
                  pageInfo: {
                    __typename: 'PageInfo' as const,
                    hasNextPage: faker.datatype.boolean(),
                  },
                  edges: [
                    {
                      __typename: 'HenkenEdge' as const,
                      node: {
                        __typename: 'Henken' as const,
                        id: faker.datatype.uuid(),
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
                        postsTo: {
                          __typename: 'User' as const,
                          id: faker.datatype.uuid(),
                          alias: faker.random.alphaNumeric(8),
                          displayName: faker.name.findName(),
                          avatar: faker.image.avatar(),
                        },
                        answer: faker.random.arrayElement([
                          {
                            __typename: 'Answer' as const,
                            id: faker.datatype.uuid(),
                            comment: faker.lorem.sentence(),
                            type: faker.random.arrayElement([
                              AnswerType.Right,
                              AnswerType.Wrong,
                            ]),
                          },
                          null,
                        ]),
                      },
                    },
                  ],
                },
                receivedHenkens: {
                  __typename: 'HenkenConnection' as const,
                  totalCount: faker.datatype.number(),
                  pageInfo: {
                    __typename: 'PageInfo' as const,
                    hasNextPage: faker.datatype.boolean(),
                  },
                  edges: [
                    {
                      __typename: 'HenkenEdge' as const,
                      node: {
                        __typename: 'Henken' as const,
                        id: faker.datatype.uuid(),
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
                        answer: faker.random.arrayElement([
                          {
                            __typename: 'Answer' as const,
                            id: faker.datatype.uuid(),
                            comment: faker.lorem.sentence(),
                            type: faker.random.arrayElement([
                              AnswerType.Right,
                              AnswerType.Wrong,
                            ]),
                          },
                          null,
                        ]),
                      },
                    },
                  ],
                },
                activities: {
                  __typename: 'UserActivityConnection' as const,
                  pageInfo: {
                    __typename: 'PageInfo' as const,
                    hasNextPage: faker.datatype.boolean(),
                    endCursor: faker.random.arrayElement([
                      faker.datatype.uuid(),
                      null,
                    ]),
                  },
                  edges: [
                    {
                      __typename: 'UserActivityEdge' as const,
                      node: {
                        __typename: 'UserActivity' as const,
                        event: faker.random.arrayElement([
                          {
                            __typename: 'Henken' as const,
                            id: faker.datatype.uuid(),
                            createdAt: faker.date
                              .between('2020-01-01', '2020-12-31')
                              .toISOString(),
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
                            __typename: 'Answer' as const,
                            id: faker.datatype.uuid(),
                            createdAt: faker.date
                              .between('2020-01-01', '2020-12-31')
                              .toISOString(),
                            comment: faker.lorem.sentence(),
                            type: faker.random.arrayElement([
                              AnswerType.Right,
                              AnswerType.Wrong,
                            ]),
                            answerTo: {
                              __typename: 'Henken' as const,
                              id: faker.datatype.uuid(),
                              createdAt: faker.date
                                .between('2020-01-01', '2020-12-31')
                                .toISOString(),
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
                    },
                  ],
                },
              },
            },
          },
        ];
      }),
    )('findUser.userが存在する場合 %#', (payload) => {
      const actual = transformer(payload);
      expect(actual).toMatchSnapshot();
    });
  });
});
