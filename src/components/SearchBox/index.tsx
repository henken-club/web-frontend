import clsx from 'clsx';
import {gql} from 'graphql-request';
import React, {ContextType, useMemo, useState} from 'react';
import {useDebounce} from 'react-use';

import {useSearchBoxQuery} from '../codegen';

import {SearchBoxContext} from './context';
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
                    id
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

export const Component: React.VFC<{
  className?: string;
  focus: boolean;
}> = ({className, focus}) => {
  return (
    <div className={clsx(className, ['relative'])}>
      <Input className={clsx(['relative'], ['w-full'], ['z-1'])} />

      <>
        <div
          className={clsx(
            ['fixed', 'inset-0', 'z-0'],
            [{hidden: !focus}],
            ['bg-black', ['bg-opacity-25']],
          )}
        />
        <Suggestions
          className={clsx(
            ['absolute', ['top-full'], 'z-1'],
            [{hidden: !focus}],
            ['mt-0.5'],
            ['w-full'],
          )}
        />
      </>
    </div>
  );
};

export const SearchBox: React.VFC<{className?: string}> = ({...props}) => {
  const [input, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const [result, reexecuteQuery] = useSearchBoxQuery({
    variables: {query},
    pause: query === '',
  });
  const {fetching, data} = result;

  useDebounce(() => setQuery(input), 500, [input]);

  const suggestions = useMemo<
    Exclude<ContextType<typeof SearchBoxContext>['suggestions'], undefined>
  >(
    () => ({
      nodes: data?.search.nodes
        ? data.search.nodes.map(({content}) => {
            switch (content.__typename) {
              case 'Author':
                return {
                  type: 'author',
                  content: {id: content.id, name: content.name},
                };
              case 'Book':
                return {
                  type: 'book',
                  content: {
                    id: content.id,
                    title: content.title,
                    authors: content.writings.edges.map(({node}) => ({
                      id: node.author.id,
                      name: node.author.name,
                    })),
                  },
                };
              case 'BookSeries':
                return {
                  type: 'bookSeries',
                  content: {id: content.id, title: content.title},
                };
            }
          })
        : [],
    }),
    [data?.search],
  );

  const contextValue = useMemo<ContextType<typeof SearchBoxContext>>(() => {
    if (input === '') {
      return {
        updateQuery: (query) => setInputValue(query),
        focus,
        updateFocus: setFocus,
        query: '',
        fetching: false,
        suggestions: undefined,
      };
    }
    return {
      updateQuery: (query) => setInputValue(query),
      focus,
      updateFocus: setFocus,
      query: input,
      fetching,
      suggestions,
    };
  }, [fetching, focus, input, suggestions]);

  return (
    <SearchBoxContext.Provider value={contextValue}>
      <Component {...props} focus={focus} />
    </SearchBoxContext.Provider>
  );
};
