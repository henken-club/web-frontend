import gql from 'graphql-tag';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';
import {Merge} from 'type-fest';

import {getSdk} from './index.page.codegen';
import {TransformedProps, transformer} from './index.transform';

import {graphqlClient} from '~/libs/graphql-request';
import {Error} from '~/components/common/Error';
import {
  BadRequestError,
  ErrorHandling,
  ServerSideError,
  TransformError,
} from '~/components/common/error';

const AllRecommendationsPagesQuery = gql`
  query AllRecommendationsPages {
    manyRecommendations(limit: 100) {
      id
    }
  }
`;

export type UrlQuery = {id: string};
export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  return getSdk(graphqlClient)
    .AllRecommendationsPages()
    .then(({manyRecommendations}) => ({
      fallback: 'blocking',
      paths: manyRecommendations.map(({id}) => ({params: {id}})),
    }));
};

const RecommendationPageQuery = gql`
  query RecommendationPage($id: ID!) {
    findRecommendation(id: $id) {
      recommendation {
        id
        score
        updatedAt
        recommendsTo {
          id
          alias
          displayName
          avatar
        }
        content {
          __typename
          id
          ... on Book {
            id
            title
            cover
          }
          ... on BookSeries {
            id
            title
          }
        }
      }
    }
  }
`;

export type StaticProps = ErrorHandling<TransformedProps>;
export const getStaticProps: GetStaticProps<StaticProps, UrlQuery> = async ({
  params,
}) => {
  try {
    if (!params?.id) throw new BadRequestError();

    const result = await getSdk(graphqlClient)
      .RecommendationPage({id: params.id})
      .catch((error) => {
        throw new ServerSideError();
      });
    const transformed = transformer(result);
    if (!transformed) throw new TransformError();

    return {props: transformed, revalidate: 60};
  } catch (error) {
    if (error instanceof BadRequestError)
      return {props: {error: error.serialize()}};
    if (error instanceof ServerSideError)
      return {props: {error: error.serialize()}};
    if (error instanceof TransformError)
      return {props: {error: error.serialize()}};
    throw error;
  }
};

export type PageProps = Merge<
  {className?: string},
  InferGetStaticPropsType<typeof getStaticProps>
>;
export const Page: NextPage<PageProps> = ({className, ...props}) => {
  if ('error' in props) return <Error />;
  else return <>{props.recommendation.id}</>;
};
export default Page;
