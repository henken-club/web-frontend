import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from './Book';

export default {
  title: 'SearchBox/Suggestions/Book',
  component: Component,
  argTypes: {
    registering: {table: {disable: true}},
  },
} as Meta;

type StoryProps = ComponentProps<typeof Component>;

export const Primary: Story<StoryProps> = (args) => {
  return <Component {...args} />;
};
Primary.args = {
  id: 'book',
  title: 'Book_title',
  authors: [
    {id: 'book-author-1', name: 'Author1'},
    {id: 'book-author-2', name: 'Author2'},
  ],
};
