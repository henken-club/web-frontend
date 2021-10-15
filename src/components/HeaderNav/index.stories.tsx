import {action} from '@storybook/addon-actions';
import {Meta, Story} from '@storybook/react';
import React, {ContextType} from 'react';

import {HeaderNavContext} from './context';

import {Component, ComponentProps} from '.';

export default {
  title: 'HeaderNav',
  component: Component,
} as Meta;

type StoryProps = ComponentProps & {
  contextValue: ContextType<typeof HeaderNavContext>;
};

export const NotLoggedInYet: Story<StoryProps> = ({contextValue, ...args}) => (
  <HeaderNavContext.Provider value={contextValue}>
    <Component {...args} />
  </HeaderNavContext.Provider>
);
NotLoggedInYet.storyName = '未ログイン';
NotLoggedInYet.args = {
  focusing: false,
  contextValue: {
    onFocus: action('on-focus'),
    onBlur: action('on-blur'),
    callLogin: () => {},
    callRegister: () => {},
    authenticated: false,
  },
};

export const FetchingViewer: Story<StoryProps> = ({contextValue, ...args}) => (
  <HeaderNavContext.Provider value={contextValue}>
    <Component {...args} />
  </HeaderNavContext.Provider>
);
FetchingViewer.storyName = 'Viewer取得中';
FetchingViewer.args = {
  focusing: false,
  contextValue: {
    onFocus: action('on-focus'),
    onBlur: action('on-blur'),
    callLogin: () => {},
    callRegister: () => {},
    authenticated: true,
    viewer: undefined,
  },
};

export const NotRegisteredYet: Story<StoryProps> = ({
  contextValue,
  ...args
}) => (
  <HeaderNavContext.Provider value={contextValue}>
    <Component {...args} />
  </HeaderNavContext.Provider>
);
NotRegisteredYet.storyName = 'ログイン済みだが登録未完了';
NotRegisteredYet.args = {
  focusing: false,
  contextValue: {
    onFocus: action('on-focus'),
    onBlur: action('on-blur'),
    callLogin: () => {},
    callRegister: () => {},
    authenticated: true,
    viewer: null,
  },
};

export const Registered: Story<StoryProps> = ({contextValue, ...args}) => (
  <HeaderNavContext.Provider value={contextValue}>
    <Component {...args} />
  </HeaderNavContext.Provider>
);
Registered.storyName = '登録済み';
Registered.args = {
  focusing: false,
  contextValue: {
    onFocus: action('on-focus'),
    onBlur: action('on-blur'),
    callLogin: () => {},
    callRegister: () => {},
    authenticated: true,
    viewer: {
      id: 'id',
      alias: 'alias',
      displayName: 'DisplayName',
      avatar: '/.mock/avatar_1.png',
    },
  },
};
