import faker from 'faker';

import {
  AllAnswerPagesQuery,
  AllAnswerPagesQueryVariables,
  AnswerPageQuery,
} from '../codegen';

export const factoryAllAnswerPagesQuery = ({
  limit,
}: AllAnswerPagesQueryVariables): AllAnswerPagesQuery => ({
  __typename: 'Query',
  manyAnswers: [...new Array(limit)].map((_, i) => ({
    __typename: 'Answer',
    id: faker.datatype.uuid(),
  })),
});

export const factoryAnswerPageQuery = (): AnswerPageQuery => ({
  __typename: 'Query',
  findAnswer: {
    __typename: 'FindAnswerPayload',
    answer: {
      __typename: 'Answer',
      id: faker.datatype.uuid(),
    },
  },
});
