import crypto from 'crypto';

import {graphql} from 'msw';
import * as faker from 'faker';

import {
  factoryAllAnswerPagesQuery,
  factoryAnswerPageQuery,
} from '../factories/AnswerPage';
import {
  AllUserPagesDocument,
  AllUserPagesQuery,
  AllUserPagesQueryVariables,
  UserPageDocument,
  UserPageQuery,
  UserPageQueryVariables,
  GetViewerQuery,
  GetViewerQueryVariables,
  GetViewerDocument,
  AllHenkenPagesQuery,
  AllHenkenPagesQueryVariables,
  AllHenkenPagesDocument,
  HenkenPageDocument,
  HenkenPageQuery,
  HenkenPageQueryVariables,
  RecommendationPageQuery,
  RecommendationPageQueryVariables,
  RecommendationPageDocument,
  AllRecommendationsPagesDocument,
  AllRecommendationsPagesQuery,
  AllRecommendationsPagesQueryVariables,
  AnswerPageQuery,
  AnswerPageQueryVariables,
  AnswerPageDocument,
  AllAnswerPagesQuery,
  AllAnswerPagesQueryVariables,
  AllAnswerPagesDocument,
} from '../codegen';
import {
  factoryAllRecommendationsPage,
  factoryRecommendationPage,
} from '../factories/RecommendationPage';
import {
  factoryUnauthorizedViewer,
  factoryAuthorizedViewer,
} from '../factories/Viewer';
import {factoryUserPage, factoryAllUserPages} from '../factories/UserPage';
import {
  factoryAllHenkenPages,
  factoryHenkenPage,
} from '../factories/HenkenPage';

const generateSeed = (variables: Record<string, unknown>) =>
  Number.parseInt(
    crypto
      .createHash('md5')
      .update(JSON.stringify(variables))
      .digest('hex')
      .substr(0, 8),
    16,
  );

export const handlers = [
  graphql.query<GetViewerQuery, GetViewerQueryVariables>(
    GetViewerDocument,
    (req, res, ctx) => {
      faker.seed(0);
      if (req.headers.get('Authorization'))
        return res(ctx.data(factoryAuthorizedViewer()));
      else return res(ctx.data(factoryUnauthorizedViewer()));
    },
  ),
  graphql.query<AllUserPagesQuery, AllUserPagesQueryVariables>(
    AllUserPagesDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryAllUserPages(req.variables)));
    },
  ),
  graphql.query<UserPageQuery, UserPageQueryVariables>(
    UserPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryUserPage(req.variables)));
    },
  ),
  graphql.query<AllHenkenPagesQuery, AllHenkenPagesQueryVariables>(
    AllHenkenPagesDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryAllHenkenPages(req.variables)));
    },
  ),
  graphql.query<HenkenPageQuery, HenkenPageQueryVariables>(
    HenkenPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryHenkenPage(req.variables)));
    },
  ),
  graphql.query<
    AllRecommendationsPagesQuery,
    AllRecommendationsPagesQueryVariables
  >(AllRecommendationsPagesDocument, (req, res, ctx) => {
    faker.seed(generateSeed(req.variables));
    return res(ctx.data(factoryAllRecommendationsPage(req.variables)));
  }),
  graphql.query<RecommendationPageQuery, RecommendationPageQueryVariables>(
    RecommendationPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryRecommendationPage(req.variables)));
    },
  ),
  graphql.query<AllAnswerPagesQuery, AllAnswerPagesQueryVariables>(
    AllAnswerPagesDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryAllAnswerPagesQuery(req.variables)));
    },
  ),
  graphql.query<AnswerPageQuery, AnswerPageQueryVariables>(
    AnswerPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryAnswerPageQuery()));
    },
  ),
];
