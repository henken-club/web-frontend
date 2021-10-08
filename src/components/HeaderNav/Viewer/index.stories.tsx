import {Meta, Story} from '@storybook/react';
import React from 'react';

import {Viewer, ViewerProps} from '.';

export default {
  title: 'HeaderNav/Viewer',
  component: Viewer,
  decorators: [
    (Story) => (
      <div css={{display: 'flex', justifyContent: 'flex-end'}}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Primary: Story<ViewerProps> = (args) => <Viewer {...args} />;
Primary.args = {
  viewer: {
    id: 'id',
    alias: 'alias',
    displayName: 'DisplayName',
    avatar: '/avatar_1.png',
  },
};
