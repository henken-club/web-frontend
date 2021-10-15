import faker from 'faker';

import {serializer} from './index.serializer';

import {factoryUserPage} from '~/mocks/factories/UserPage';
import {alias} from '~/mocks/factories/common';

describe('index.serializer', () => {
  describe('serializer', () => {
    it('findUser.userがnullならnullを返却', () => {
      const actual = serializer({
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
      const actual = serializer(payload);
      expect(actual).toMatchSnapshot();
    });
  });
});
