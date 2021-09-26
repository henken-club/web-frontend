import gql from 'graphql-tag';
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import React from 'react';
import {Merge} from 'type-fest';

import {getSdk} from './index.page.codegen';
import {TransformedProps, transformer} from './index.transform';

import {graphqlClient} from '~/libs/graphql-request';

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

export type UrlQuery = {alias: string};
export type ServerSideProps = TransformedProps;
export const getServerSideProps: GetServerSideProps<ServerSideProps, UrlQuery> =
  async ({params}) => {
    if (!params?.alias) return {notFound: true};

    return getSdk(graphqlClient)
      .UserPage({alias: params.alias})
      .then(transformer)
      .then((value) => (value ? {props: value} : {notFound: true}));
  };

export type PageProps = Merge<
  {className?: string},
  InferGetServerSidePropsType<typeof getServerSideProps>
>;
export const Page: NextPage<PageProps> = ({className, user, ...props}) => {
  return (
    <>
      <p>{user.id}</p>
      <p>{user.alias}</p>
      <p>{user.displayName}</p>
    </>
  );
};
export default Page;
