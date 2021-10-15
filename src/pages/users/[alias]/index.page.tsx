import gql from 'graphql-tag';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';

import {getSdk} from './index.page.codegen';
import {SerializedPageProps, serializer} from './index.serializer';

import {graphqlClient} from '~/libs/graphql-request';
import {TemplateUserPage} from '~/components/templates/UserPage';

const AllUserPagesQuery = gql`
  query AllUserPages($limit: Int!) {
    manyUsers(first: $limit, orderBy: {field: CREATED_AT, direction: DESC}) {
      edges {
        node {
          id
          alias
        }
      }
    }
  }
`;

export type UrlQuery = {alias: string};
export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  return getSdk(graphqlClient)
    .AllUserPages({limit: 100})
    .then(({manyUsers}) => ({
      fallback: 'blocking',
      paths: manyUsers.edges.map(({node: {alias}}) => ({params: {alias}})),
    }));
};

const UserPageQuery = gql`
  query UserPage($alias: String!) {
    findUser(alias: $alias) {
      user {
        id
        alias
        displayName
        avatar
        followees(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              user: to {
                id
                alias
                avatar
              }
            }
          }
        }
        followers(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              user: from {
                id
                alias
                avatar
              }
            }
          }
        }
        postsHenkens(first: 3, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              comment
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
              answer {
                id
                comment
                type
              }
            }
          }
        }
        postsAnswers(first: 3, orderBy: {field: CREATED_AT, direction: DESC}) {
          totalCount
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              type
              comment
              henken {
                id
                comment
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
      }
    }
  }
`;

export type StaticProps = SerializedPageProps;
export const getStaticProps: GetStaticProps<StaticProps, UrlQuery> = async ({
  params,
}) => {
  if (!params?.alias) return {notFound: true};

  try {
    const result = await getSdk(graphqlClient).UserPage({alias: params.alias});
    const transformed = serializer(result);
    if (transformed) return {props: transformed, revalidate: 60};
    else return {notFound: true};
  } catch (error) {
    return {notFound: true};
  }
};

export const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  user,
  ...props
}) => {
  return (
    <>
      <TemplateUserPage user={user} />
    </>
  );
};
export default Page;
