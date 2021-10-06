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
import {SerializedProps, serializer} from './index.serializer';

import {graphqlClient} from '~/libs/graphql-request';

const AllAnswerPagesQuery = gql`
  query AllAnswerPages($limit: Int!) {
    manyAnswers(first: $limit, orderBy: {direction: DESC, field: CREATED_AT}) {
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
    .AllAnswerPages({limit: 10})
    .then(({manyAnswers}) => ({
      fallback: 'blocking',
      paths: manyAnswers.edges.map(({node: {id}}) => ({params: {id}})),
    }));
};

const AnswerPageQuery = gql`
  query AnswerPage($id: ID!) {
    findAnswer(id: $id) {
      answer {
        id
        comment
        createdAt
        type
        henken {
          id
          comment
          postedBy {
            id
            alias
            displayName
            avatar
          }
          postsTo {
            id
            alias
            displayName
            avatar
          }
          content {
            __typename
            ... on Book {
              id
              title
              cover
            }
            ... on BookSeries {
              id
              title
            }
            ... on Author {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export type StaticProps = SerializedProps;
export const getStaticProps: GetStaticProps<StaticProps, UrlQuery> = async ({
  params,
}) => {
  if (!params?.id) return {notFound: true};
  const result = await getSdk(graphqlClient).AnswerPage({id: params.id});
  const transformed = serializer(result);
  if (transformed === null) return {notFound: true};
  return {props: transformed, revalidate: 60};
};

export type PageProps = Merge<
  {className?: string},
  InferGetStaticPropsType<typeof getStaticProps>
>;
export const Page: NextPage<PageProps> = ({className, answer, ...props}) => {
  return (
    <>
      <h1>{answer.id}</h1>
      {JSON.stringify(answer)}
    </>
  );
};
export default Page;
