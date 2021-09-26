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

export const transformActivitiesEdge = ({
  node: {id, event},
}: User['activities']['edges'][number]): ActivityNode => {
  switch (event.__typename) {
    case 'Henken':
      return {
        id,
        type: 'Henken',
        henken: {
          id: event.id,
          createdAt: event.createdAt,
          comment: event.comment,
          postedBy: transformUser(event.postedBy),
          content: transformHenkenContent(event.content),
        },
      };
    case 'Answer':
      return {
        id,
        type: 'Answer',
        answer: {
          id: event.id,
          createdAt: event.createdAt,
          comment: event.comment,
          type: transformAnswerType(event.type),
          answerTo: {
            id: event.answerTo.id,
            createdAt: event.answerTo.createdAt,
            comment: event.answerTo.comment,
            postedBy: transformUser(event.answerTo.postedBy),
            content: transformHenkenContent(event.answerTo.content),
          },
        },
      };
  }
};

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
    recienvedHenkens: {
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
    activities: {
      more: boolean;
      cursor: string | null;
      nodes: ActivityNode[];
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
            users: user.followees.edges.map(({node}) => transformUser(node)),
          },
          followers: {
            count: user.followers.totalCount,
            more: user.followers.pageInfo.hasNextPage,
            users: user.followers.edges.map(({node}) => transformUser(node)),
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
          recienvedHenkens: {
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
          activities: {
            cursor: user.activities.pageInfo.endCursor || null,
            more: user.activities.pageInfo.hasNextPage,
            nodes: user.activities.edges.map((edge) =>
              transformActivitiesEdge(edge),
            ),
          },
        },
      }
    : null;
