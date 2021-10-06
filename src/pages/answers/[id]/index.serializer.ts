import {AnswerPageQuery as PageQueryResult} from './index.page.codegen';

import {
  AnswerType,
  serializeAnswer,
  serializeAnswerType,
  serializeHenken,
  serializeUser,
} from '~/libs/serializer';

type ResultAnswer = Exclude<
  PageQueryResult['findAnswer']['answer'],
  null | undefined
>;

export const serializeContent = (
  content: ResultAnswer['henken']['content'],
):
  | {type: 'Book'; book: {id: string; title: string; cover: string | null}}
  | {type: 'BookSeries'; bookSeries: {id: string; title: string}}
  | {type: 'Author'; author: {id: string; name: string}} => {
  switch (content.__typename) {
    case 'Book':
      return {
        type: 'Book' as const,
        book: {
          id: content.id,
          title: content.title,
          cover: content.cover || null,
        },
      };
    case 'BookSeries':
      return {
        type: 'BookSeries',
        bookSeries: {
          id: content.id,
          title: content.title,
        },
      };
    case 'Author':
      return {
        type: 'Author',
        author: {
          id: content.id,
          name: content.name,
        },
      };
  }
};

export type SerializedProps = {
  answer: {
    id: string;
    comment: string;
    createdAt: string;
    type: AnswerType;
    henken: {
      id: string;
      comment: string;
      postedBy: {
        id: string;
        alias: string;
        displayName: string;
        avatar: string;
      };
      postsTo: {
        id: string;
        alias: string;
        displayName: string;
        avatar: string;
      };
      content: ReturnType<typeof serializeContent>;
    };
  };
};

export const serializer = ({
  findAnswer: {answer},
}: PageQueryResult): SerializedProps | null =>
  answer
    ? {
        answer: serializeAnswer({
          ...answer,
          type: serializeAnswerType(answer.type),
          henken: serializeHenken({
            ...answer.henken,
            postsTo: serializeUser({...answer.henken.postsTo}),
            postedBy: serializeUser({...answer.henken.postedBy}),
            content: serializeContent({...answer.henken.content}),
          }),
        }),
      }
    : null;
