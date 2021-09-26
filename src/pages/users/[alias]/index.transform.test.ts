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

    it('findUser.userが存在するなら変換する', () => {
      faker.seed(0);

      const actual = transformer({
        __typename: 'Query',
        findUser: {
          __typename: 'FindUserPayload',
          user: {
            __typename: 'User',
            id: 'id',
            alias: 'alias',
            displayName: 'displayName',
            avatar: 'avatar',
            followees: {
              __typename: 'UserConnection',
              totalCount: 1,
              pageInfo: {
                __typename: 'PageInfo',
                hasNextPage: false,
              },
              edges: [
                {
                  __typename: 'UserEdge',
                  node: {
                    __typename: 'User',
                    id: 'followee1.id',
                    alias: 'followee1.alias',
                    avatar: 'followee1.avatar',
                  },
                },
              ],
            },
            followers: {
              __typename: 'UserConnection',
              totalCount: 2,
              pageInfo: {
                __typename: 'PageInfo',
                hasNextPage: true,
              },
              edges: [
                {
                  __typename: 'UserEdge',
                  node: {
                    __typename: 'User',
                    id: 'followers1.id',
                    alias: 'followers1.alias',
                    avatar: 'followers1.avatar',
                  },
                },
              ],
            },
            postsHenkens: {
              __typename: 'HenkenConnection',
              totalCount: 3,
              pageInfo: {
                __typename: 'PageInfo',
                hasNextPage: false,
              },
              edges: [
                {
                  __typename: 'HenkenEdge',
                  node: {
                    __typename: 'Henken',
                    id: 'posts1.id',
                    comment: 'posts1.comment',
                    content: {
                      __typename: 'Book',
                      id: 'posts1.book.id',
                      title: 'posts1.book.title',
                    },
                    postsTo: {
                      __typename: 'User',
                      id: 'posts1.postsTo.id',
                      alias: 'posts1.postsTo.alias',
                      displayName: 'posts1.postsTo.displayName',
                      avatar: 'posts1.postsTo.avatar',
                    },
                    answer: {
                      __typename: 'Answer',
                      id: 'posts1.answer.id',
                      comment: 'posts1.answer.comment',
                      type: AnswerType.Right,
                    },
                  },
                },
                {
                  __typename: 'HenkenEdge',
                  node: {
                    __typename: 'Henken',
                    id: 'posts2.id',
                    comment: 'posts2.comment',
                    content: {
                      __typename: 'Book',
                      id: 'posts2.book.id',
                      title: 'posts2.book.title',
                    },
                    postsTo: {
                      __typename: 'User',
                      id: 'posts2.postsTo.id',
                      alias: 'posts2.postsTo.alias',
                      displayName: 'posts2.postsTo.displayName',
                      avatar: 'posts2.postsTo.avatar',
                    },
                  },
                },
                {
                  __typename: 'HenkenEdge',
                  node: {
                    __typename: 'Henken',
                    id: 'posts3.id',
                    comment: 'posts3.comment',
                    content: {
                      __typename: 'BookSeries',
                      id: 'posts3.bookSeries.id',
                      title: 'posts3.bookSeries.title',
                    },
                    postsTo: {
                      __typename: 'User',
                      id: 'posts3.postsTo.id',
                      alias: 'posts3.postsTo.alias',
                      displayName: 'posts3.postsTo.displayName',
                      avatar: 'posts3.postsTo.avatar',
                    },
                    answer: {
                      __typename: 'Answer',
                      id: 'posts3.answer.id',
                      comment: 'posts3.answer.comment',
                      type: AnswerType.Wrong,
                    },
                  },
                },
              ],
            },
            receivedHenkens: {
              __typename: 'HenkenConnection',
              totalCount: 4,
              pageInfo: {
                __typename: 'PageInfo',
                hasNextPage: true,
              },
              edges: [
                {
                  __typename: 'HenkenEdge',
                  node: {
                    __typename: 'Henken',
                    id: 'received1.id',
                    comment: 'received1.comment',
                    content: {
                      __typename: 'Book',
                      id: 'received1.book.id',
                      title: 'received1.book.title',
                    },
                    postedBy: {
                      __typename: 'User',
                      id: 'received1.postedBy.id',
                      alias: 'received1.postedBy.alias',
                      displayName: 'received1.postedBy.displayName',
                      avatar: 'received1.postedBy.avatar',
                    },
                    answer: {
                      __typename: 'Answer',
                      id: 'received1.answer.id',
                      comment: 'received1.answer.comment',
                      type: AnswerType.Right,
                    },
                  },
                },
                {
                  __typename: 'HenkenEdge',
                  node: {
                    __typename: 'Henken',
                    id: 'received2.id',
                    comment: 'received2.comment',
                    content: {
                      __typename: 'Book',
                      id: 'received2.book.id',
                      title: 'received2.book.title',
                    },
                    postedBy: {
                      __typename: 'User',
                      id: 'received2.postedBy.id',
                      alias: 'received2.postedBy.alias',
                      displayName: 'received2.postedBy.displayName',
                      avatar: 'received2.postedBy.avatar',
                    },
                  },
                },
                {
                  __typename: 'HenkenEdge',
                  node: {
                    __typename: 'Henken',
                    id: 'received3.id',
                    comment: 'received3.comment',
                    content: {
                      __typename: 'BookSeries',
                      id: 'received3.bookSeries.id',
                      title: 'received3.bookSeries.title',
                    },
                    postedBy: {
                      __typename: 'User',
                      id: 'received3.postedBy.id',
                      alias: 'received3.postedBy.alias',
                      displayName: 'received3.postedBy.displayName',
                      avatar: 'received3.postedBy.avatar',
                    },
                    answer: {
                      __typename: 'Answer',
                      id: 'received3.answer.id',
                      comment: 'received3.answer.comment',
                      type: AnswerType.Wrong,
                    },
                  },
                },
              ],
            },
            activities: {
              __typename: 'UserActivityConnection',
              pageInfo: {
                __typename: 'PageInfo',
                hasNextPage: true,
                endCursor: faker.datatype.uuid(),
              },
              edges: [
                {
                  __typename: 'UserActivityEdge',
                  node: {
                    __typename: 'UserActivity',
                    event: {
                      __typename: 'Henken',
                      id: faker.datatype.uuid(),
                      comment: faker.lorem.sentence(),
                      content: {
                        __typename: 'Book',
                        id: faker.datatype.uuid(),
                        title: faker.lorem.words(),
                      },
                      createdAt: faker.date
                        .between('2020-01-01', '2020-12-31')
                        .toISOString(),
                      postedBy: {
                        __typename: 'User',
                        id: faker.datatype.uuid(),
                        alias: faker.random.alphaNumeric(8),
                        displayName: faker.name.findName(),
                        avatar: faker.image.avatar(),
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      });

      expect(actual).toMatchSnapshot();
    });
  });
});
