import faker from 'faker';

import {RecommendationPageQuery} from './index.page.codegen';
import {transformContent, transformer} from './index.transform';

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
        return [
          {
            __typename: 'Query',
            findRecommendation: {
              __typename: 'FindRecommendationPayload',
              recommendation: {
                __typename: 'Recommendation',
                id: faker.datatype.uuid(),
                score: faker.datatype.number(),
                updatedAt: faker.date
                  .between('2020-01-01', '2020-12-31')
                  .toISOString(),
                recommendsTo: {
                  __typename: 'User',
                  id: faker.datatype.uuid(),
                  alias: faker.random.alphaNumeric(8),
                  displayName: faker.name.findName(),
                  avatar: faker.image.avatar(),
                },
                content: faker.random.arrayElement([
                  {
                    __typename: 'Book',
                    id: faker.datatype.uuid(),
                    title: faker.lorem.words(),
                    cover: faker.random.arrayElement([
                      null,
                      faker.image.abstract(),
                    ]),
                  },
                  {
                    __typename: 'BookSeries',
                    id: faker.datatype.uuid(),
                    title: faker.lorem.words(),
                  },
                ]),
              },
            },
          },
        ];
      }),
    )('recommendationが存在する場合 %#', (payload) => {
      const actual = transformer(payload);
      expect(actual).toMatchSnapshot();
    });
  });
});
