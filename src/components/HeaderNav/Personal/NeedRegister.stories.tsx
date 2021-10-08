import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from './NeedRegister';

export default {
  title: 'HeaderNav/Personal/NeedRegister',
  component: Component,
} as Meta;

export const Primary: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);
Primary.args = {};
