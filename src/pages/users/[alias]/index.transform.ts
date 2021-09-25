import {
  AnswerType,
  UserPageQuery as UserPageQueryResult,
} from './index.page.codegen';

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
          type: 'right' | 'wrong';
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
          type: 'right' | 'wrong';
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

export const transformAnswerType = (type: AnswerType) => {
  switch (type) {
    case AnswerType.Right:
      return 'right';
    case AnswerType.Wrong:
      return 'wrong';
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
            users: user.followees.edges.map(({node}) => ({
              id: node.id,
              alias: node.alias,
              avatar: node.avatar,
            })),
          },
          followers: {
            count: user.followers.totalCount,
            more: user.followers.pageInfo.hasNextPage,
            users: user.followers.edges.map(({node}) => ({
              id: node.id,
              alias: node.alias,
              avatar: node.avatar,
            })),
          },
          postsHenkens: {
            count: user.postsHenkens.totalCount,
            more: user.postsHenkens.pageInfo.hasNextPage,
            henkens: user.postsHenkens.edges.map(({node}) => ({
              id: node.id,
              comment: node.comment,
              content: transformHenkenContent(node.content),
              postsTo: {
                id: node.postsTo.id,
                alias: node.postsTo.alias,
                displayName: node.postsTo.displayName,
                avatar: node.postsTo.avatar,
              },
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
              postedBy: {
                id: node.postedBy.id,
                alias: node.postedBy.alias,
                displayName: node.postedBy.displayName,
                avatar: node.postedBy.avatar,
              },
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
