import faker from 'faker';

export const factoryUser = ({
  ...props
}: {
  id?: string;
  alias?: string;
  displayName?: string;
  avatar?: string;
} = {}) => ({
  __typename: 'User' as const,
  id: faker.datatype.uuid(),
  alias: faker.lorem.word(),
  displayName: faker.name.firstName(),
  avatar: faker.image.avatar(),
  ...props,
});

export const factoryUserEdge = ({
  node = [],
}: {node?: Parameters<typeof factoryUser>} = {}) => ({
  __typename: 'UserEdge' as const,
  node: factoryUser(...node),
});
