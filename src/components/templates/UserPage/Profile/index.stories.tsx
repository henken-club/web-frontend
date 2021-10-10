import {Meta, Story} from '@storybook/react';
import React, {ComponentProps, ContextType} from 'react';
import {action} from '@storybook/addon-actions';

import {UserPageProfileContext} from './context';

import {Component} from '.';

export default {
  title: 'UserPage/Profile',
  component: Component,
  argTypes: {
    isFollowing: {table: {disable: true}},
    canPostHenken: {table: {disable: true}},
  },
} as Meta;

type StoryProps = ComponentProps<typeof Component> & {
  contextValue: ContextType<typeof UserPageProfileContext>;
};

const commonArgs = {
  contextValue: {
    follow: action('follow'),
    callPostHenkenPopup: action('callPostHenkenPopup'),
    callUnfollowPopup: action('callUnfollowPopup'),
  },
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
};

export const NotFollowingAndCannotPostHenken: Story<StoryProps> = ({
  contextValue,
  ...args
}) => {
  return (
    <UserPageProfileContext.Provider value={contextValue}>
      <Component {...args} />
    </UserPageProfileContext.Provider>
  );
};
NotFollowingAndCannotPostHenken.storyName =
  'フォローはしていないし，偏見も送れない';
NotFollowingAndCannotPostHenken.args = {
  ...commonArgs,
  isFollowing: false,
  canPostHenken: false,
};

export const NotFollowingButCanPostHenken: Story<StoryProps> = ({
  contextValue,
  ...args
}) => {
  return (
    <UserPageProfileContext.Provider value={contextValue}>
      <Component {...args} />
    </UserPageProfileContext.Provider>
  );
};
NotFollowingButCanPostHenken.storyName = 'フォローはしていないが，偏見を送れる';
NotFollowingButCanPostHenken.args = {
  ...commonArgs,
  isFollowing: false,
  canPostHenken: true,
};

export const FollowingButCannotPostHenken: Story<StoryProps> = ({
  contextValue,
  ...args
}) => {
  return (
    <UserPageProfileContext.Provider value={contextValue}>
      <Component {...args} />
    </UserPageProfileContext.Provider>
  );
};
FollowingButCannotPostHenken.storyName = 'フォロー中だが，偏見を送れない';
FollowingButCannotPostHenken.args = {
  ...commonArgs,
  isFollowing: true,
  canPostHenken: false,
};

export const FollowingAndCanPostHenken: Story<StoryProps> = ({
  contextValue,
  ...args
}) => {
  return (
    <UserPageProfileContext.Provider value={contextValue}>
      <Component {...args} />
    </UserPageProfileContext.Provider>
  );
};
FollowingAndCanPostHenken.storyName = 'フォロー中かつ，偏見を送れる';
FollowingAndCanPostHenken.args = {
  ...commonArgs,
  isFollowing: true,
  canPostHenken: true,
};
