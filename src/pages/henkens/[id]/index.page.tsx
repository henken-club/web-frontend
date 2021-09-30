import gql from 'graphql-tag';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import React from 'react';
import {Merge} from 'type-fest';
import Link from 'next/link';
import Image from 'next/image';

import {getSdk} from './index.page.codegen';
import {SerializedProps, serializer} from './index.serializer';

import {graphqlClient} from '~/libs/graphql-request';

const AllHenkenPagesQuery = gql`
  query AllHenkenPages($limit: Int!) {
    manyHenkens(limit: $limit) {
      id
    }
  }
`;

export type UrlQuery = {id: string};
export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  return getSdk(graphqlClient)
    .AllHenkenPages()
    .then(({manyHenkens}) => ({
      fallback: 'blocking',
      paths: manyHenkens.map(({id}) => ({params: {id}})),
    }));
};

const HenkenPageQuery = gql`
  query HenkenPage($id: ID!) {
    findHenken(id: $id) {
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
  const result = await getSdk(graphqlClient).HenkenPage({id: params.id});
  const transformed = serializer(result);
  if (transformed === null) return {notFound: true};
  return {props: transformed, revalidate: 60};
};

export const User: React.VFC<{
  user: {id: string; avatar: string; alias: string; displayName: string};
}> = ({user: {id, alias, avatar, displayName}}) => (
  <>
    <Link href={`/users/${alias}`}>
      <a>
        <Image width={24} height={24} src={avatar} />
      </a>
    </Link>
    <span>{displayName}</span>
    <span>{alias}</span>
  </>
);

export type PageProps = Merge<
  {className?: string},
  InferGetStaticPropsType<typeof getStaticProps>
>;
export const Page: NextPage<PageProps> = ({className, henken, ...props}) => {
  return (
    <>
      <h1>{henken.id}</h1>
      <p>{henken.comment}</p>
      <p>From</p>
      <User user={henken.postedBy} />
      <p>To</p>
      <User user={henken.postsTo} />
      <p>Content</p>
      {henken.content.type === 'Book' && (
        <>
          {henken.content.book.cover && (
            <Image width={320} height={320} src={henken.content.book.cover} />
          )}
          <span>{henken.content.book.title}</span>
        </>
      )}
      {henken.content.type === 'BookSeries' && (
        <>
          <span>{henken.content.bookSeries.title}</span>
        </>
      )}
    </>
  );
};
export default Page;
