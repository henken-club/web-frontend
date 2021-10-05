import {
  AllAnswerPagesQuery,
  AllAnswerPagesQueryVariables,
  AnswerPageQuery,
  AnswerPageQueryVariables,
} from '../codegen';

import {
  alias,
  answerType,
  avatar,
  bookCover,
  comment,
  createdAt,
  displayName,
  id,
  repeat,
  title,
  which,
} from './common';

export const factoryAllAnswerPages = ({
  limit,
}: AllAnswerPagesQueryVariables): AllAnswerPagesQuery => ({
  __typename: 'Query',
  manyAnswers: {
    __typename: 'AnswerConnection',
    edges: repeat(limit, () => ({
      __typename: 'AnswerEdge',
      node: {
        __typename: 'Answer',
        id: id(),
      },
    })),
  },
});

export const factoryAnswerPage = (
  variables: AnswerPageQueryVariables,
): AnswerPageQuery => ({
  __typename: 'Query',
  findAnswer: {
    __typename: 'FindAnswerPayload',
    answer: {
      __typename: 'Answer',
      id: id(),
      comment: comment(),
      createdAt: createdAt(),
      type: answerType(),
      henken: {
        __typename: 'Henken',
        id: id(),
        comment: comment(),
        postsTo: {
          __typename: 'User',
          id: id(),
          alias: alias(),
          displayName: displayName(),
          avatar: avatar(),
        },
        postedBy: {
          __typename: 'User',
          id: id(),
          alias: alias(),
          displayName: displayName(),
          avatar: avatar(),
        },
        content: which([
          {__typename: 'Book', id: id(), title: title(), cover: bookCover()},
          {__typename: 'BookSeries', id: id(), title: title()},
        ]),
      },
    },
  },
});
