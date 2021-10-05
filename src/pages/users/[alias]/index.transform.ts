import {
  AnswerType as AnswerTypeEnum,
  UserPageQuery as UserPageQueryResult,
} from './index.page.codegen';

type User = Exclude<UserPageQueryResult['findUser']['user'], null | undefined>;

export const transformUser = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'User'} & T) => ({
  ...props,
});

type AnswerType = 'right' | 'wrong';
export const transformAnswerType = (type: AnswerTypeEnum): AnswerType => {
  switch (type) {
    case AnswerTypeEnum.Right:
      return 'right';
    case AnswerTypeEnum.Wrong:
      return 'wrong';
  }
};

type ActivityNode =
  | {id: string} & (
      | {
          type: 'Henken';
          henken: {
            id: string;
            createdAt: string;
            comment: string;
            postedBy: {
              id: string;
              alias: string;
              displayName: string;
              avatar: string;
            };
            content:
              | {type: 'Book'; book: {id: string; title: string}}
              | {type: 'BookSeries'; bookSeries: {id: string; title: string}};
          };
        }
      | {
          type: 'Answer';
          answer: {
            id: string;
            createdAt: string;
            comment: string;
            type: AnswerType;
            answerTo: {
              id: string;
              createdAt: string;
              comment: string;
              postedBy: {
                id: string;
                alias: string;
                displayName: string;
                avatar: string;
              };
              content:
                | {type: 'Book'; book: {id: string; title: string}}
                | {type: 'BookSeries'; bookSeries: {id: string; title: string}};
            };
          };
        }
    );

export type TransformedProps = {
  user: {
    id: string;
    alias: string;
    displayName: string;
    avatar: string;
    followees: {
      count: number;
      more: boolean;
      users: {
        id: string;
        alias: string;
        avatar: string;
      }[];
    };
    followers: {
      count: number;
      more: boolean;
      users: {
        id: string;
        alias: string;
        avatar: string;
      }[];
    };
    postsHenkens: {
      count: number;
      more: boolean;
      henkens: {
        id: string;
        comment: string;
        content:
          | {type: 'Book'; book: {id: string; title: string}}
          | {type: 'BookSeries'; bookSeries: {id: string; title: string}};
        postsTo: {
          id: string;
          alias: string;
          displayName: string;
          avatar: string;
        };
        answer: {
          id: string;
          comment: string;
          type: AnswerType;
        } | null;
      }[];
    };
    receivedHenkens: {
      count: number;
      more: boolean;
      henkens: {
        id: string;
        comment: string;
        content:
          | {type: 'Book'; book: {id: string; title: string}}
          | {type: 'BookSeries'; bookSeries: {id: string; title: string}};
        postedBy: {
          id: string;
          alias: string;
          displayName: string;
          avatar: string;
        };
        answer: {
          id: string;
          comment: string;
          type: AnswerType;
        } | null;
      }[];
    };
  };
};

export const transformHenkenContent = ({
  __typename,
  ...props
}:
  | {__typename: 'Book'; id: string; title: string}
  | {__typename: 'BookSeries'; id: string; title: string}):
  | {type: 'Book'; book: {id: string; title: string}}
  | {type: 'BookSeries'; bookSeries: {id: string; title: string}} => {
  switch (__typename) {
    case 'Book':
      return {type: 'Book' as const, book: props};
    case 'BookSeries':
      return {type: 'BookSeries' as const, bookSeries: props};
  }
};

export const transformer = ({
  findUser: {user},
}: UserPageQueryResult): TransformedProps | null =>
  user
    ? {
        user: {
          id: user.id,
          alias: user.alias,
          displayName: user.displayName,
          avatar: user.avatar,
          followees: {
            count: user.followees.totalCount,
            more: user.followees.pageInfo.hasNextPage,
            users: user.followees.edges.map(({node: {user}}) =>
              transformUser(user),
            ),
          },
          followers: {
            count: user.followers.totalCount,
            more: user.followers.pageInfo.hasNextPage,
            users: user.followers.edges.map(({node: {user}}) =>
              transformUser(user),
            ),
          },
          postsHenkens: {
            count: user.postsHenkens.totalCount,
            more: user.postsHenkens.pageInfo.hasNextPage,
            henkens: user.postsHenkens.edges.map(({node}) => ({
              id: node.id,
              comment: node.comment,
              content: transformHenkenContent(node.content),
              postsTo: transformUser(node.postsTo),
              answer: node.answer
                ? {
                    id: node.answer.id,
                    comment: node.answer.comment,
                    type: transformAnswerType(node.answer.type),
                  }
                : null,
            })),
          },
          receivedHenkens: {
            count: user.receivedHenkens.totalCount,
            more: user.receivedHenkens.pageInfo.hasNextPage,
            henkens: user.receivedHenkens.edges.map(({node}) => ({
              id: node.id,
              comment: node.comment,
              content: transformHenkenContent(node.content),
              postedBy: transformUser(node.postedBy),
              answer: node.answer
                ? {
                    id: node.answer.id,
                    comment: node.answer.comment,
                    type: transformAnswerType(node.answer.type),
                  }
                : null,
            })),
          },
        },
      }
    : null;
