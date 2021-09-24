import {GraphQLHandler} from 'msw';

const devMocks: GraphQLHandler[] = [];

export const handlers =
  // eslint-disable-next-line no-process-env
  process.env.NODE_ENV === 'development' ? devMocks : [];
