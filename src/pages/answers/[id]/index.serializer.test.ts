import faker from 'faker';

import {serializer} from './index.serializer';

import {factoryAnswerPage} from '~/mocks/factories/AnswerPage';

describe('AnswerPage serializer', () => {
  describe('serializer()', () => {
    it('findAnswer.answerがnullならnullを返却', () => {
      const actual = serializer({
        __typename: 'Query',
        findAnswer: {__typename: 'FindAnswerPayload', answer: null},
      });
      expect(actual).toBeNull();
    });

    it.each(
      [...new Array(10)].map((_, i) => {
        faker.seed(i);
        return [factoryAnswerPage()];
      }),
    )('findAnswer.answerが存在する場合 %#', (payload) => {
      const actual = serializer(payload);
      expect(actual).toMatchSnapshot();
    });
  });
});
