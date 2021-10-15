import {UserPageQuery as UserPageQueryResult} from './index.page.codegen';

import {AnswerType, serializeAnswerType} from '~/libs/serializer';

type User = Exclude<UserPageQueryResult['findUser']['user'], null | undefined>;

export const serializeUser = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'User';} & T) => ({
  ...props,
});

export const serializeContent = (
  content: User['postsHenkens']['edges'][number]['node']['content'],
):
  | {type: 'book'; value: {id: string; title: string;};}
  | {type: 'bookSeries'; value: {id: string; title: string;};}
  | {type: 'author'; value: {id: string; name: string;};} => {
  switch (content.__typename) {
    case 'Book':
      return {
        type: 'book',
        value: {
          id: content.id,
          title: content.title,
        },
      };
    case 'BookSeries':
      return {
        type: 'bookSeries',
        value: {
          id: content.id,
          title: content.title,
        },
      };
    case 'Author':
      return {
        type: 'author',
        value: {
          id: content.id,
          name: content.name,
        },
      };
  }
};

export type SerializedPageProps = {
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
          | {type: 'book'; value: {id: string; title: string;};}
          | {type: 'bookSeries'; value: {id: string; title: string;};}
          | {type: 'author'; value: {id: string; name: string;};};
        postsTo: {
          id: string;
          alias: string;
          displayName: string;
          avatar: string;
        };
        answer: {
          id: string;
          type: AnswerType;
          comment: string;
        } | null;
      }[];
    };
    postsAnswers: {
      count: number;
      more: boolean;
      answers: {
        id: string;
        type: AnswerType;
        comment: string;
        postsTo: {
          id: string;
          alias: string;
          displayName: string;
          avatar: string;
        };
        henken: {
          id: string;
          comment: string;
          content:
            | {type: 'book'; value: {id: string; title: string;};}
            | {type: 'bookSeries'; value: {id: string; title: string;};}
            | {type: 'author'; value: {id: string; name: string;};};
        };
      }[];
    };
  };
};

export const serializer = ({
  findUser: {user},
}: UserPageQueryResult): SerializedPageProps | null =>
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
            serializeUser(user)
          ),
        },
        followers: {
          count: user.followers.totalCount,
          more: user.followers.pageInfo.hasNextPage,
          users: user.followers.edges.map(({node: {user}}) =>
            serializeUser(user)
          ),
        },
        postsHenkens: {
          count: user.postsHenkens.totalCount,
          more: user.postsHenkens.pageInfo.hasNextPage,
          henkens: user.postsHenkens.edges.map(
            ({node: {id, comment, content, postsTo, answer}}) => ({
              id,
              comment,
              postsTo: serializeUser(postsTo),
              answer: answer
                ? {
                  id: answer.id,
                  type: serializeAnswerType(answer.type),
                  comment: answer.comment,
                }
                : null,
              content: serializeContent(content),
            }),
          ),
        },
        postsAnswers: {
          count: user.postsAnswers.totalCount,
          more: user.postsAnswers.pageInfo.hasNextPage,
          answers: user.postsAnswers.edges.map(
            ({node: {id, type, comment, henken}}) => ({
              id,
              type: serializeAnswerType(type),
              comment,
              postsTo: serializeUser(henken.postsTo),
              henken: {
                id: henken.id,
                comment: henken.comment,
                content: serializeContent(henken.content),
              },
            }),
          ),
        },
      },
    }
    : null;
