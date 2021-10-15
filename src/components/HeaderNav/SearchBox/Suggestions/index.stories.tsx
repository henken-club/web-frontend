import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from '.';

export default {
  title: 'HeaderNav/SearchBox/Suggestions',
  component: Component,
  argTypes: {
    registering: {table: {disable: true}},
  },
} as Meta;

type StoryProps = ComponentProps<typeof Component>;

export const Suggestions: Story<StoryProps> = (args) => {
  return <Component {...args} />;
};
Suggestions.storyName = '提案がある';
Suggestions.args = {
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
            {id: 'book-author-1', name: 'Author1'},
            {id: 'book-author-2', name: 'Author2'},
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
};

export const NoSuggestions: Story<StoryProps> = (args) => {
  return <Component {...args} />;
};
NoSuggestions.storyName = '提案なし';
NoSuggestions.args = {
  suggestions: {nodes: []},
};
