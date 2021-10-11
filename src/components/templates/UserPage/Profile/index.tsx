import clsx from 'clsx';
import React, {ContextType, useContext, useMemo} from 'react';

import {UserPageContext} from '../context';

import {Followees, Followers} from './UsersGrid';
import {UnfollowButton} from './ButtonUnfollow';
import {FollowButton} from './ButtonFollow';
import {UserPageProfileContext} from './context';

import {useTranslation} from '~/i18n/useTranslation';
import {AvatarLarge} from '~/components/Avatar';

export const Component: React.VFC<{
  className?: string;
  id: string;
  alias: string;
  displayName: string;
  avatar: string;
  isFollowing: boolean;
  canPostHenken: boolean;
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
}> = ({
  className,
  alias,
  displayName,
  avatar,
  followees,
  followers,
  isFollowing,
  canPostHenken,
}) => {
  const {LL} = useTranslation();
  return (
    <header
      className={clsx(
        className,
        ['px-4', 'sm:px-8', 'md:px-8', 'xl:px-12'],
        ['py-4', 'md:py-8', 'lg:py-8'],
        ['flex', ['flex-col', 'lg:flex-col']],
        ['bg-white'],
        [['rounded-md'], ['shadow-md']],
      )}
    >
      <div
        className={clsx([
          'flex',
          ['flex-row', 'lg:flex-col'],
          ['items-center'],
        ])}
      >
        <div
          className={clsx([
            ['w-16', 'sm:w-24', 'lg:w-32'],
            ['h-16', 'sm:h-24', 'lg:h-32'],
          ])}
        >
          <AvatarLarge user={{alias, avatar}} />
        </div>
        <div className={clsx(['flex-grow'], ['lg:mt-4'], ['ml-4', 'lg:ml-0'])}>
          <h1 className={clsx(['col-span-full'], ['flex', ['flex-col']])}>
            <span className={clsx(['text-xl'])}>{displayName}</span>
            <span className={clsx(['text-sm'], ['text-gray-500'])}>
              {LL.Format.Alias({alias})}
            </span>
          </h1>
          {isFollowing && (
            <div
              className={clsx(
                ['col-span-full'],
                ['h-8'],
                ['mt-2'],
                ['flex', ['items-center']],
              )}
            >
              <span
                className={clsx(['flex-grow'], ['text-sm'], ['text-gray-400'])}
              >
                {LL.UserPage.Profile.Following()}
              </span>
              <UnfollowButton />
            </div>
          )}
          {!isFollowing && (
            <>
              <FollowButton className={clsx(['w-full'], ['mt-2'], ['h-8'])} />
            </>
          )}
        </div>
      </div>
      <div
        className={clsx(
          ['flex-grow'],
          [['mt-4']],
          [
            'grid',
            ['grid-cols-2', 'lg:grid-cols-1'],
            [['sm:gap-x-4'], ['lg:gap-y-4']],
            ['items-center'],
          ],
        )}
      >
        <div
          className={clsx(
            ['col-span-1'],
            ['flex', ['flex-col'], ['items-center']],
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
    </header>
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
  const {isFollowing, canPostsHenken, follow} = useContext(UserPageContext);

  const contextValue = useMemo<ContextType<typeof UserPageProfileContext>>(
    () => ({
      follow,
      callPostHenkenPopup: () => {},
      callUnfollowPopup: () => {},
    }),
    [follow],
  );

  return (
    <UserPageProfileContext.Provider value={contextValue}>
      <Component
        className={clsx(className)}
        isFollowing={isFollowing}
        canPostHenken={canPostsHenken}
        {...user}
      />
    </UserPageProfileContext.Provider>
  );
};
