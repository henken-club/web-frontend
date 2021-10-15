import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import React, {ComponentProps, ContextType} from 'react';

import {SearchBoxContext} from './context';

import {Component} from '.';

export default {
  title: 'SearchBox',
  component: Component,
  argTypes: {
    registering: {table: {disable: true}},
  },
} as Meta;

type StoryProps = ComponentProps<typeof Component> & {
  contextValue: ContextType<typeof SearchBoxContext>;
};

export const Initial: Story<StoryProps> = ({contextValue, ...args}) => {
  return (
    <SearchBoxContext.Provider value={contextValue}>
      <Component {...args} />
    </SearchBoxContext.Provider>
  );
};
Initial.storyName = '初期状態';
Initial.args = {
  contextValue: {
    updateQuery: action('update-query'),
    updateFocus: action('update-focus'),
    focus: true,
    query: '',
    fetching: false,
    suggestions: {nodes: []},
  },
};

export const Fetching: Story<StoryProps> = ({contextValue, ...args}) => {
  return (
    <SearchBoxContext.Provider value={contextValue}>
      <Component {...args} />
    </SearchBoxContext.Provider>
  );
};
Fetching.storyName = '提案がある状態で，取得中';
Fetching.args = {
  contextValue: {
    updateQuery: action('update-query'),
    updateFocus: action('update-focus'),
    focus: true,
    query: 'query',
    fetching: true,
    suggestions: {
      nodes: [
        {
          type: 'author',
          content: {id: 'author', name: 'Author_name'},
        },
        {
          type: 'book',
          content: {
            id: 'book',
            title: 'Book_title',
            authors: [
              {id: 'book.author.1', name: 'Author1'},
              {id: 'book.author.2', name: 'Author2'},
            ],
          },
        },
        {
          type: 'bookSeries',
          content: {id: 'book_series', title: 'BookSeries_title'},
        },
      ],
    },
  },
};

export const FetchingWithNoSuggestions: Story<StoryProps> = ({
  contextValue,
  ...args
}) => {
  return (
    <SearchBoxContext.Provider value={contextValue}>
      <Component {...args} />
    </SearchBoxContext.Provider>
  );
};
FetchingWithNoSuggestions.storyName = '提案が無い状態で，取得中';
FetchingWithNoSuggestions.args = {
  contextValue: {
    updateQuery: action('update-query'),
    updateFocus: action('update-focus'),
    focus: true,
    query: '',
    fetching: true,
    suggestions: {nodes: []},
  },
};

export const Fetched: Story<StoryProps> = ({contextValue, ...args}) => {
  return (
    <SearchBoxContext.Provider value={contextValue}>
      <Component {...args} />
    </SearchBoxContext.Provider>
  );
};
Fetched.storyName = '取得済みで，提案がある';
Fetched.args = {
  contextValue: {
    updateQuery: action('update-query'),
    updateFocus: action('update-focus'),
    focus: true,
    query: '',
    fetching: false,
    suggestions: {
      nodes: [
        {
          type: 'author',
          content: {
            id: 'author',
            name: 'Author_name',
          },
        },
        {
          type: 'book',
          content: {
            id: 'book',
            title: 'Book_title',
            authors: [
              {id: 'book.author.1', name: 'Author1'},
              {id: 'book.author.2', name: 'Author2'},
            ],
          },
        },
        {
          type: 'bookSeries',
          content: {
            id: 'book_series',
            title: 'BookSeries_title',
          },
        },
      ],
    },
  },
};

export const FetchedButNoSuggestions: Story<StoryProps> = ({
  contextValue,
  ...args
}) => {
  return (
    <SearchBoxContext.Provider value={contextValue}>
      <Component {...args} />
    </SearchBoxContext.Provider>
  );
};
FetchedButNoSuggestions.storyName = '取得済みで，提案が一件も無い';
FetchedButNoSuggestions.args = {
  contextValue: {
    updateQuery: action('update-query'),
    updateFocus: action('update-focus'),
    focus: true,
    query: '',
    fetching: false,
    suggestions: {nodes: []},
  },
};
