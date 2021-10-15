import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from '.';

export default {
  title: 'HeaderNav/Personal/Viewer',
  component: Component,
  decorators: [
    (Story) => (
      <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <Story />
      </div>
    ),
  ],
} as Meta;

type StoryProps = ComponentProps<typeof Component>;

export const Primary: Story<StoryProps> = (args) => <Component {...args} />;
Primary.args = {
  viewer: {
    id: 'id',
    alias: 'alias',
    displayName: 'DisplayName',
    avatar: '/.mock/avatar_1.png',
  },
  onFocus: action('onFocus'),
  onBlur: action('onBlur'),
};
