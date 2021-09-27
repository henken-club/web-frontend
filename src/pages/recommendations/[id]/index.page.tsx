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
import {ErrorCp} from '~/components/common/Error';

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

export type StaticProps = TransformedProps | {error: {status: 401 | 404 | 500}};
export const getStaticProps: GetStaticProps<StaticProps, UrlQuery> = async ({
  params,
}) => {
  if (!params?.id) return {props: {error: {status: 401}}};
  try {
    const result = await getSdk(graphqlClient)
      .RecommendationPage({id: params.id})
      .catch((error) => {
        throw error;
      });
    const transformed = transformer(result);
    if (!transformed) return {props: {error: {status: 404}}};
    return {
      props: transformed,
      revalidate: 60,
    };
  } catch (error) {
    return {props: {error: {status: 500}}};
  }
};

export type PageProps = Merge<
  {className?: string},
  InferGetStaticPropsType<typeof getStaticProps>
>;
export const Page: NextPage<PageProps> = ({className, ...props}) => {
  if ('error' in props) return <ErrorCp />;
  else return <>{props.recommendation.id}</>;
};
export default Page;
