import faker from 'faker';

import {RecommendationPageQuery} from './index.page.codegen';
import {transformContent, transformer} from './index.transform';

import {id} from '~/mocks/factories/common';
import {factoryRecommendationPage} from '~/mocks/factories/RecommendationPage';

describe('Recommendation Page transformer', () => {
  describe('transformContent', () => {
    it('Book if cover exists', () => {
      const actual = transformContent({
        __typename: 'Book',
        id: 'id',
        title: 'title',
        cover: 'cover',
      });

      expect(actual).toStrictEqual({
        type: 'Book',
        book: {
          id: 'id',
          title: 'title',
          cover: 'cover',
        },
      });
    });

    it('Book if cover exists', () => {
      const actual = transformContent({
        __typename: 'Book',
        id: 'id',
        title: 'title',
        cover: null,
      });

      expect(actual).toStrictEqual({
        type: 'Book',
        book: {
          id: 'id',
          title: 'title',
          cover: null,
        },
      });
    });

    it('BookSeries', () => {
      const actual = transformContent({
        __typename: 'BookSeries',
        id: 'id',
        title: 'title',
      });

      expect(actual).toStrictEqual({
        type: 'BookSeries',
        bookSeries: {
          id: 'id',
          title: 'title',
        },
      });
    });
  });

  describe('transform', () => {
    it('recommendationが存在しない場合', () => {
      const actual = transformer({
        __typename: 'Query',
        findRecommendation: {
          __typename: 'FindRecommendationPayload',
          recommendation: null,
        },
      });
      expect(actual).toBeNull();
    });

    it.each(
      [...new Array(10)].map((_, i): [RecommendationPageQuery] => {
        faker.seed(i);
        return [factoryRecommendationPage({id: id()})];
      }),
    )('recommendationが存在する場合 %#', (payload) => {
      const actual = transformer(payload);
      expect(actual).toMatchSnapshot();
    });
  });
});
