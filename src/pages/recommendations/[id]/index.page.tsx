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

export type StaticProps = TransformedProps;
export const getStaticProps: GetStaticProps<StaticProps, UrlQuery> = async ({
  params,
}) => {
  if (!params?.id) return {notFound: true};

  try {
    const result = await getSdk(graphqlClient).RecommendationPage({
      id: params.id,
    });
    const transformed = transformer(result);
    if (transformed) return {props: transformed, revalidate: 60};
    else return {notFound: true};
  } catch (error) {
    return {notFound: true};
  }
};

export type PageProps = Merge<
  {className?: string},
  InferGetStaticPropsType<typeof getStaticProps>
>;
export const Page: NextPage<PageProps> = ({
  className,
  recommendation,
  ...props
}) => {
  return <></>;
};
export default Page;
