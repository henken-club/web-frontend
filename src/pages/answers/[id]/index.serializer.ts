import {AnswerPageQuery as PageQueryResult} from './index.page.codegen';

import {
  AnswerType,
  ContentBook,
  ContentBookSeries,
  serializeAnswer,
  serializeAnswerType,
  SerializeContent,
  serializeHenken,
  serializeUser,
} from '~/libs/serializer';

type ResultAnswer = Exclude<
  PageQueryResult['findAnswer']['answer'],
  null | undefined
>;

export const serializeContent: SerializeContent<
  ResultAnswer['answerTo']['content'],
  {id: string; title: string; cover: string | null},
  {id: string; title: string}
> = (content) => {
  switch (content.__typename) {
    case 'Book':
      return {
        type: 'Book',
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
  }
};

export type SerializedProps = {
  answer: {
    id: string;
    comment: string;
    createdAt: string;
    type: AnswerType;
    answerTo: {
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
      content:
        | ContentBook<{id: string; title: string}>
        | ContentBookSeries<{id: string; title: string}>;
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
          answerTo: serializeHenken({
            ...answer.answerTo,
            postsTo: serializeUser({...answer.answerTo.postsTo}),
            postedBy: serializeUser({...answer.answerTo.postedBy}),
            content: serializeContent({...answer.answerTo.content}),
          }),
        }),
      }
    : null;
