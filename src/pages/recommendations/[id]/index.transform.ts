import {RecommendationPageQuery as PageResult} from './index.page.codegen';

import {serializeUser} from '~/libs/serializer';

type ResultRecommendation = Exclude<
  PageResult['findRecommendation']['recommendation'],
  null | undefined
>;

type RecommendsTo = {
  id: string;
  alias: string;
  displayName: string;
  avatar: string;
};

type ContentBook = {
  type: 'Book';
  book: {id: string; title: string; cover: string | null};
};

type ContentBookSeries = {
  type: 'BookSeries';
  bookSeries: {id: string; title: string};
};

export type TransformedProps = {
  recommendation: {
    id: string;
    score: number;
    updatedAt: string;
    recommendsTo: RecommendsTo;
    content: ContentBook | ContentBookSeries;
  };
};

export const transformContent = (
  content: ResultRecommendation['content'],
): ContentBook | ContentBookSeries => {
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

export const transformer = ({
  findRecommendation: {recommendation},
}: PageResult): TransformedProps | null =>
  recommendation
    ? {
        recommendation: {
          id: recommendation.id,
          score: recommendation.score,
          updatedAt: recommendation.updatedAt,
          recommendsTo: serializeUser(recommendation.recommendsTo),
          content: transformContent(recommendation.content),
        },
      }
    : null;
