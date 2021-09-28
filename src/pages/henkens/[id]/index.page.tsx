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

const AllHenkenPagesQuery = gql`
  query AllHenkenPages {
    manyHenkens(limit: 100) {
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
    const result = await getSdk(graphqlClient).HenkenPage({id: params.id});
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
export const Page: NextPage<PageProps> = ({className, henken, ...props}) => {
  return (
    <>
      <h1>{henken.id}</h1>
    </>
  );
};
export default Page;
