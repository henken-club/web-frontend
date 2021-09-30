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
    manyUsers(limit: $limit) {
      id
      alias
    }
  }
`;

export type UrlQuery = {alias: string};
export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  return getSdk(graphqlClient)
    .AllUserPages()
    .then(({manyUsers}) => ({
      fallback: 'blocking',
      paths: manyUsers.map(({alias}) => ({params: {alias}})),
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
        followees(first: 12) {
          totalCount
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              alias
              avatar
            }
          }
        }
        followers(first: 12) {
          totalCount
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              alias
              avatar
            }
          }
        }
        receivedHenkens(first: 3) {
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
              }
              answer {
                id
                comment
                type
              }
            }
          }
        }
        postsHenkens(first: 3) {
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
              }
              answer {
                id
                comment
                type
              }
            }
          }
        }
        activities(first: 20) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              event {
                __typename
                ... on Henken {
                  id
                  createdAt
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
                  }
                }
                ... on Answer {
                  id
                  createdAt
                  comment
                  type
                  answerTo {
                    id
                    createdAt
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
                    }
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
      <>
        <p>Activities</p>
        {user.activities.nodes.map((node) => (
          <div key={node.id}>
            {node.type === 'Henken' && (
              <>
                <Link href={`/henkens/${node.henken.id}`}>
                  <a>Henken</a>
                </Link>
                <p>{node.henken.comment}</p>
              </>
            )}
            {node.type === 'Answer' && (
              <>
                <Link href={`/answers/${node.answer.id}`}>
                  <a>Answer</a>
                </Link>
                <p>{node.answer.comment}</p>
              </>
            )}
          </div>
        ))}
      </>
    </>
  );
};
export default Page;
