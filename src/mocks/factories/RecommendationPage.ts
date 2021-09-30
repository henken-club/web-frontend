import {
  AllRecommendationsPagesQuery,
  AllRecommendationsPagesQueryVariables,
  RecommendationPageQuery,
  RecommendationPageQueryVariables,
} from '../codegen';

import {
  alias,
  avatar,
  bookCover,
  displayName,
  score,
  id,
  title,
  updatedAt,
  which,
  repeat,
} from './common';

export const factoryAllRecommendationsPage = (
  variables: AllRecommendationsPagesQueryVariables,
): AllRecommendationsPagesQuery => ({
  __typename: 'Query',
  manyRecommendations: repeat(variables.limit, () => ({
    __typename: 'Recommendation',
    id: id(),
  })),
});

export const factoryRecommendationPage = (
  variables: RecommendationPageQueryVariables,
): RecommendationPageQuery => ({
  __typename: 'Query',
  findRecommendation: {
    __typename: 'FindRecommendationPayload',
    recommendation: {
      __typename: 'Recommendation',
      id: variables.id,
      score: score(),
      updatedAt: updatedAt(),
      recommendsTo: {
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
});
