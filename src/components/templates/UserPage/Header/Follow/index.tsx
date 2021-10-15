import React from 'react';

import {UsersGrid} from './UsersGrid';

import {LinkUserFollowers} from '~/components/Link';

export const Followees: React.VFC<{
  className?: string;
  alias: string;
  followees: {
    users: {id: string; alias: string; avatar: string;}[];
    more: boolean;
  };
}> = ({alias, followees, ...props}) => (
  <UsersGrid
    {...props}
    {...followees}
    linkMore={({...props}) => <LinkUserFollowers alias={alias} {...props} />}
  />
);

export const Followers: React.VFC<{
  className?: string;
  alias: string;
  followers: {
    users: {id: string; alias: string; avatar: string;}[];
    more: boolean;
  };
}> = ({alias, followers, ...props}) => (
  <UsersGrid
    {...props}
    {...followers}
    linkMore={({...props}) => <LinkUserFollowers alias={alias} {...props} />}
  />
);
