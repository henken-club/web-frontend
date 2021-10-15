import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from './Badges';

export default {
  title: 'UserPage/Header/Badges',
  component: Component,
  argTypes: {},
} as Meta;

type StoryProps = ComponentProps<typeof Component>;

export const Primary: Story<StoryProps> = ({...args}) => {
  return <Component {...args} />;
};
Primary.args = {
  isFollowing: true,
  isFollowed: true,
  canPostHenken: true,
};
