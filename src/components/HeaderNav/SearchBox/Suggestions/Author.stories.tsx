import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from './Author';

export default {
  title: 'HeaderNav/SearchBox/Suggestions/Author',
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
  id: 'author',
  name: 'Author_name',
};
