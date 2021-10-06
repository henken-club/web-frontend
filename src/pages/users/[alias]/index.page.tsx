import gql from 'graphql-tag';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';
import {Merge} from 'type-fest';
import Image from 'next/image';
import Link from 'next/link';

import {getSdk} from './index.page.codegen';
import {TransformedProps, transformer} from './index.transform';

import {graphqlClient} from '~/libs/graphql-request';

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
        followees(first: 12, orderBy: {field: CREATED_AT, direction: DESC}) {
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
        followers(first: 12, orderBy: {field: CREATED_AT, direction: DESC}) {
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
        receivedHenkens(
          first: 3
          orderBy: {field: CREATED_AT, direction: DESC}
        ) {
          totalCount
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              comment
              postedBy {
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
      }
    }
  }
`;

export type StaticProps = TransformedProps;
export const getStaticProps: GetStaticProps<StaticProps, UrlQuery> = async ({
  params,
}) => {
  if (!params?.alias) return {notFound: true};

  try {
    const result = await getSdk(graphqlClient).UserPage({alias: params.alias});
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
export const Page: NextPage<PageProps> = ({className, user, ...props}) => {
  return (
    <>
      <Image width={128} height={128} src={user.avatar} />
      <p>{user.id}</p>
      <p>{user.alias}</p>
      <p>{user.displayName}</p>
      <>
        <p>Followees</p>
        {user.followees.users.map(({id, alias, avatar}) => (
          <Link key={id} href={`/users/${alias}`}>
            <a>
              <Image width={24} height={24} src={avatar} />
            </a>
          </Link>
        ))}
      </>
      <>
        <p>Followers</p>
        {user.followers.users.map(({id, alias, avatar}) => (
          <Link key={id} href={`/users/${alias}`}>
            <a>
              <Image width={24} height={24} src={avatar} />
            </a>
          </Link>
        ))}
      </>
    </>
  );
};
export default Page;
