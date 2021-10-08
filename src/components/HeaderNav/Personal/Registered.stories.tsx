import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from './Registered';

export default {
  title: 'HeaderNav/Personal/Registered',
  component: Component,
} as Meta;

export const Primary: Story<ComponentProps<typeof Component>> = (args) => (
  <Component {...args} />
);
Primary.args = {
  viewer: {
    id: 'id',
    alias: 'alias',
    displayName: 'DisplayName',
    avatar: '/avatar_1.png',
  },
};
