import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from '.';

export default {
  title: 'SearchBox/Input',
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
  onInputQuery: action('input-query'),
};
