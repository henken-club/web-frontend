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

const AllRecommendationsPagesQuery = gql`
  query AllRecommendationsPages($limit: Int!) {
    manyRecommendations(first: $limit, orderBy: {field: SCORE, order: DESC}) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export type UrlQuery = {id: string};
export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  return getSdk(graphqlClient)
    .AllRecommendationsPages({limit: 100})
    .then(({manyRecommendations}) => ({
      fallback: 'blocking',
      paths: manyRecommendations.edges.map(({node: {id}}) => ({params: {id}})),
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

export type StaticProps = TransformedProps;
export const getStaticProps: GetStaticProps<StaticProps, UrlQuery> = async ({
  params,
}) => {
  if (!params?.id) return {redirect: {destination: '/', permanent: true}};
  const result = await getSdk(graphqlClient).RecommendationPage({
    id: params.id,
  });
  const transformed = transformer(result);
  if (transformed === null) return {notFound: true};
  return {props: transformed, revalidate: 60};
};

export type PageProps = Merge<
  {className?: string},
  InferGetStaticPropsType<typeof getStaticProps>
>;
export const Page: NextPage<PageProps> = ({className, recommendation}) => {
  return <>{recommendation.id}</>;
};
export default Page;
