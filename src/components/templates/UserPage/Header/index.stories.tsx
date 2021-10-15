import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import React, {ComponentProps, ContextType} from 'react';

import {UserPageHeaderContext} from './context';

import {Component} from '.';

export default {
  title: 'UserPage/Header',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} as Meta;

type StoryProps = ComponentProps<typeof Component> & {
  contextValue: ContextType<typeof UserPageHeaderContext>;
};

const commonArgs = {
  id: '1',
  alias: 'alias',
  displayName: 'displayName',
  avatar: '/.mock/avatar_1.png',
  followees: {
    count: 10,
    more: true,
    users: [
      {
        id: 'user.followee.1',
        alias: 'Followee1',
        avatar: '/.mock/avatar_2.png',
      },
      {
        id: 'user.followee.2',
        alias: 'Followee2',
        avatar: '/.mock/avatar_3.png',
      },
      {
        id: 'user.followee.3',
        alias: 'Followee3',
        avatar: '/.mock/avatar_4.png',
      },
      {
        id: 'user.followee.4',
        alias: 'Followee4',
        avatar: '/.mock/avatar_5.png',
      },
      {
        id: 'user.followee.5',
        alias: 'Followee5',
        avatar: '/.mock/avatar_6.png',
      },
      {
        id: 'user.followee.6',
        alias: 'Followee6',
        avatar: '/.mock/avatar_7.png',
      },
      {
        id: 'user.followee.7',
        alias: 'Followee7',
        avatar: '/.mock/avatar_8.png',
      },
      {
        id: 'user.followee.8',
        alias: 'Followee8',
        avatar: '/.mock/avatar_9.png',
      },
      {
        id: 'user.followee.9',
        alias: 'Followee9',
        avatar: '/.mock/avatar_10.png',
      },
      {
        id: 'user.followee.10',
        alias: 'Followee10',
        avatar: '/.mock/avatar_11.png',
      },
    ],
  },
  followers: {
    count: 10,
    more: true,
    users: [
      {
        id: 'user.follower.1',
        alias: 'Follower1',
        avatar: '/.mock/avatar_2.png',
      },
      {
        id: 'user.follower.2',
        alias: 'Follower2',
        avatar: '/.mock/avatar_3.png',
      },
      {
        id: 'user.follower.3',
        alias: 'Follower3',
        avatar: '/.mock/avatar_4.png',
      },
      {
        id: 'user.follower.4',
        alias: 'Follower4',
        avatar: '/.mock/avatar_5.png',
      },
      {
        id: 'user.follower.5',
        alias: 'Follower5',
        avatar: '/.mock/avatar_6.png',
      },
      {
        id: 'user.follower.6',
        alias: 'Follower6',
        avatar: '/.mock/avatar_7.png',
      },
      {
        id: 'user.follower.7',
        alias: 'Follower4',
        avatar: '/.mock/avatar_8.png',
      },
      {
        id: 'user.follower.8',
        alias: 'Follower5',
        avatar: '/.mock/avatar_9.png',
      },
      {
        id: 'user.follower.9',
        alias: 'Follower6',
        avatar: '/.mock/avatar_10.png',
      },
      {
        id: 'user.follower.10',
        alias: 'Followee10',
        avatar: '/.mock/avatar_11.png',
      },
    ],
  },
};

export const LoggedIn: Story<StoryProps> = ({contextValue, ...args}) => {
  return (
    <UserPageHeaderContext.Provider value={contextValue}>
      <Component {...args} />
    </UserPageHeaderContext.Provider>
  );
};
LoggedIn.storyName = 'ログインしている';
LoggedIn.args = {
  ...commonArgs,
  contextValue: {
    follow: action('follow'),
    callUnfollowPopup: action('callUnfollowPopup'),
  },
  viewer: {
    isFollowing: true,
    isFollowed: true,
    canPostHenken: true,
  },
};

export const NotLoggedIn: Story<StoryProps> = ({contextValue, ...args}) => {
  return <Component {...args} />;
};
NotLoggedIn.storyName = 'ログインしていない';
NotLoggedIn.args = {
  ...commonArgs,
  viewer: undefined,
};
