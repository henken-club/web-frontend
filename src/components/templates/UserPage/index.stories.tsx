import {Meta, Story} from '@storybook/react';
import React, {ComponentProps} from 'react';

import {Component} from '.';

export default {
  title: 'UserPage',
  component: Component,
  argTypes: {
    registering: {table: {disable: true}},
  },
} as Meta;

type StoryProps = ComponentProps<typeof Component>;

export const Primary: Story<StoryProps> = ({...args}) => {
  return <Component {...args} />;
};
Primary.storyName = '通常';
Primary.args = {
  user: {
    id: '1',
    alias: 'alias',
    displayName: 'displayName',
    avatar: '/avatar_1.png',
    followees: {
      count: 10,
      more: true,
      users: [
        {id: 'user.followee.1', alias: 'Followee1', avatar: '/avatar_2.png'},
        {id: 'user.followee.2', alias: 'Followee2', avatar: '/avatar_3.png'},
        {id: 'user.followee.3', alias: 'Followee3', avatar: '/avatar_4.png'},
        {id: 'user.followee.4', alias: 'Followee4', avatar: '/avatar_5.png'},
        {id: 'user.followee.5', alias: 'Followee5', avatar: '/avatar_6.png'},
        {id: 'user.followee.6', alias: 'Followee6', avatar: '/avatar_7.png'},
        {id: 'user.followee.7', alias: 'Followee7', avatar: '/avatar_8.png'},
        {id: 'user.followee.8', alias: 'Followee8', avatar: '/avatar_9.png'},
        {id: 'user.followee.9', alias: 'Followee9', avatar: '/avatar_10.png'},
        {id: 'user.followee.10', alias: 'Followee10', avatar: '/avatar_11.png'},
      ],
    },
    followers: {
      count: 10,
      more: true,
      users: [
        {id: 'user.follower.1', alias: 'Follower1', avatar: '/avatar_2.png'},
        {id: 'user.follower.2', alias: 'Follower2', avatar: '/avatar_3.png'},
        {id: 'user.follower.3', alias: 'Follower3', avatar: '/avatar_4.png'},
        {id: 'user.follower.4', alias: 'Follower4', avatar: '/avatar_5.png'},
        {id: 'user.follower.5', alias: 'Follower5', avatar: '/avatar_6.png'},
        {id: 'user.follower.6', alias: 'Follower6', avatar: '/avatar_7.png'},
        {id: 'user.follower.7', alias: 'Follower4', avatar: '/avatar_8.png'},
        {id: 'user.follower.8', alias: 'Follower5', avatar: '/avatar_9.png'},
        {id: 'user.follower.9', alias: 'Follower6', avatar: '/avatar_10.png'},
        {id: 'user.follower.10', alias: 'Followee10', avatar: '/avatar_11.png'},
      ],
    },
    postsHenkens: {count: 10, more: true, henkens: []},
    receivedHenkens: {count: 10, more: true, henkens: []},
  },
};
