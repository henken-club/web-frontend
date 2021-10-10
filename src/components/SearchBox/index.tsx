import clsx from 'clsx';
import {gql} from 'graphql-request';
import React from 'react';

import {Input} from './Input';
import {Suggestions} from './Suggestions';

const RegisterFormMutation = gql`
  query SearchBox($query: String!) {
    search(query: $query, skip: 0, limit: 5) {
      nodes {
        content {
          ... on Author {
            id
            name
          }
          ... on Book {
            id
            title
            writings(orderBy: {direction: ASC, field: AUTHOR_NAME}) {
              edges {
                node {
                  author {
                    name
                  }
                }
              }
            }
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

export const Component: React.VFC<{className?: string}> = ({className}) => {
  return (
    <div className={clsx(className, ['relative'])}>
      <Input className={clsx(['w-full'])} />
      <Suggestions
        className={clsx(['absolute', ['top-full']], ['mt-0.5'], ['w-full'])}
      />
    </div>
  );
};

export const SearchBox: React.VFC<{className?: string}> = ({...props}) => {
  return <Component {...props} />;
};
