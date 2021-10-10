import crypto from 'crypto';

import * as faker from 'faker';
import {graphql} from 'msw';

import {
  AllAnswerPagesDocument,
  AllAnswerPagesQuery,
  AllAnswerPagesQueryVariables,
  AllHenkenPagesDocument,
  AllHenkenPagesQuery,
  AllHenkenPagesQueryVariables,
  AllRecommendationsPagesDocument,
  AllRecommendationsPagesQuery,
  AllRecommendationsPagesQueryVariables,
  AllUserPagesDocument,
  AllUserPagesQuery,
  AllUserPagesQueryVariables,
  AnswerPageDocument,
  AnswerPageQuery,
  AnswerPageQueryVariables,
  FetchViewerDocument,
  FetchViewerQuery,
  FetchViewerQueryVariables,
  HenkenPageDocument,
  HenkenPageQuery,
  HenkenPageQueryVariables,
  RecommendationPageDocument,
  RecommendationPageQuery,
  RecommendationPageQueryVariables,
  RegisterUserDocument,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  SearchBoxDocument,
  SearchBoxQuery,
  SearchBoxQueryVariables,
  UserPageDocument,
  UserPageQuery,
  UserPageQueryVariables,
  UserPageWithViewerDocument,
  UserPageWithViewerQuery,
  UserPageWithViewerQueryVariables,
} from '../codegen';
import {
  factoryAllAnswerPages,
  factoryAnswerPage,
} from '../factories/AnswerPage';
import {
  factoryAllHenkenPages,
  factoryHenkenPage,
} from '../factories/HenkenPage';
import {
  factoryAllRecommendationsPages,
  factoryRecommendationPage,
} from '../factories/RecommendationPage';
import {factoryRegisterUser} from '../factories/RegisterUser';
import {factorySearchBox} from '../factories/SearchBox';
import {
  factoryAllUserPages,
  factoryUserPage,
  factoryUserPageWithViewer,
} from '../factories/UserPage';
import {
  factoryAuthorizedViewer,
  factoryUnauthorizedViewer,
} from '../factories/Viewer';

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
  graphql.query<FetchViewerQuery, FetchViewerQueryVariables>(
    FetchViewerDocument,
    (req, res, ctx) => {
      faker.seed(0);
      if (req.headers.get('Authorization'))
        return res(ctx.data(factoryAuthorizedViewer()));
      else return res(ctx.data(factoryUnauthorizedViewer()));
    },
  ),
  graphql.query<SearchBoxQuery, SearchBoxQueryVariables>(
    SearchBoxDocument,
    (req, res, ctx) => res(ctx.data(factorySearchBox(req.variables))),
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
    return res(ctx.data(factoryAllRecommendationsPages(req.variables)));
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
      return res(ctx.data(factoryAllAnswerPages(req.variables)));
    },
  ),
  graphql.query<AnswerPageQuery, AnswerPageQueryVariables>(
    AnswerPageDocument,
    (req, res, ctx) => {
      faker.seed(generateSeed(req.variables));
      return res(ctx.data(factoryAnswerPage(req.variables)));
    },
  ),
  graphql.mutation<RegisterUserMutation, RegisterUserMutationVariables>(
    RegisterUserDocument,
    (req, res, ctx) => res(ctx.data(factoryRegisterUser(req.variables))),
  ),
  graphql.query<UserPageWithViewerQuery, UserPageWithViewerQueryVariables>(
    UserPageWithViewerDocument,
    (req, res, ctx) => res(ctx.data(factoryUserPageWithViewer(req.variables))),
  ),
];
