import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from './NeedLogin';

export default {
  title: 'HeaderNav/Personal/NeedLogin',
  component: Component,
} as Meta;

export const Primary: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);
Primary.args = {};
