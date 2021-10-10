import clsx from 'clsx';
import React from 'react';

import {Followees, Followers} from './UsersGrid';

import {AvatarLarge} from '~/components/Avatar';
import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  id: string;
  alias: string;
  displayName: string;
  avatar: string;
  followers: {
    count: number;
    users: {id: string; alias: string; avatar: string}[];
    more: boolean;
  };
  followees: {
    count: number;
    users: {id: string; alias: string; avatar: string}[];
    more: boolean;
  };
}> = ({className, alias, displayName, avatar, followees, followers}) => {
  const {LL} = useTranslation();
  return (
    <div
      className={clsx(
        className,
        ['px-8'],
        ['py-12'],
        [['rounded-md'], ['shadow-md']],
      )}
    >
      <div
        className={clsx(
          ['w-full'],
          ['grid', ['grid-cols-1', 'xl:grid-cols-2'], ['gap-x-4']],
        )}
      >
        <div className={clsx(['col-span-full'], ['flex', ['justify-center']])}>
          <div className={clsx(['w-32'], ['h-32'])}>
            <AvatarLarge user={{alias, avatar}} />
          </div>
        </div>
        <h1
          className={clsx(
            ['col-span-full'],
            ['mt-4'],
            [['text-xl'], ['text-center']],
          )}
        >
          <span>{displayName}</span>
          <span className={clsx(['text-blue-400'])}>{alias}</span>
        </h1>
        <div
          className={clsx(
            ['col-span-1'],
            ['flex', ['flex-col'], ['items-center']],
            ['mt-4'],
          )}
        >
          <div className={clsx(['flex', ['items-center']])}>
            <span>{LL.Followees()}</span>
          </div>
          <Followees
            className={clsx(['mt-2'])}
            alias={alias}
            followees={{users: followees.users, more: followees.more}}
          />
        </div>
        <div
          className={clsx(
            ['col-span-1'],
            ['flex', ['flex-col'], ['items-center']],
            ['mt-4'],
          )}
        >
          <div className={clsx(['flex', ['items-center']])}>
            <span>{LL.Followers()}</span>
          </div>
          <Followers
            className={clsx(['mt-2'])}
            alias={alias}
            followers={{users: followers.users, more: followers.more}}
          />
        </div>
      </div>
    </div>
  );
};

export const Profile: React.VFC<{
  className?: string;
  user: {
    id: string;
    alias: string;
    displayName: string;
    avatar: string;
    followers: {
      count: number;
      users: {id: string; alias: string; avatar: string}[];
      more: boolean;
    };
    followees: {
      count: number;
      users: {id: string; alias: string; avatar: string}[];
      more: boolean;
    };
  };
}> = ({user, className}) => {
  return <Component className={clsx(className)} {...user} />;
};
