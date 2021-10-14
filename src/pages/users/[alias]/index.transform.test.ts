import faker from 'faker';

import {transformer} from './index.transform';

import {alias} from '~/mocks/factories/common';
import {factoryUserPage} from '~/mocks/factories/UserPage';

describe('index.transform', () => {
  describe('transformer', () => {
    it('findUser.userがnullならnullを返却', () => {
      const actual = transformer({
        __typename: 'Query',
        findUser: {
          __typename: 'FindUserPayload',
          user: null,
        },
      });
      expect(actual).toBeNull();
    });

    it.each(
      [...new Array(10)].map((_, i) => {
        faker.seed(i);
        return [factoryUserPage({alias: alias()})];
      }),
    )('findUser.userが存在する場合 %#', (payload) => {
      const actual = transformer(payload);
      expect(actual).toMatchSnapshot();
    });
  });
});
