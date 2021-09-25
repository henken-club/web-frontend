import {graphql, GraphQLHandler} from 'msw';
import faker from 'faker';

import {GetViewerQuery, GetViewerQueryVariables} from './codegen';

const devMocks: GraphQLHandler[] = [
  graphql.query<GetViewerQuery, GetViewerQueryVariables>(
    'GetViewer',
    (req, res, ctx) => {
      if (req.headers.get('Authorization'))
        return res(
          ctx.data({
            __typename: 'Query',
            viewer: {
              __typename: 'User',
              id: faker.datatype.uuid(),
              alias: faker.hacker.ingverb(),
              displayName: faker.name.firstName(),
            },
          }),
        );
      else
        return res(
          ctx.data({
            __typename: 'Query',
            viewer: null,
          }),
        );
    },
  ),
];

export const handlers =
  // eslint-disable-next-line no-process-env
  process.env.NODE_ENV === 'development' ? devMocks : [];
