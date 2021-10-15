import clsx from 'clsx';
import React, {ComponentProps, ContextType, useContext, useMemo} from 'react';

import {UserPageContext} from '../context';

import {Badges} from './Badges';
import {FollowButton} from './ButtonFollow';
import {UserPageHeaderContext} from './context';
import {Followees, Followers} from './Follow';

import {AvatarLarge} from '~/components/Avatar';
import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  alias: string;
  displayName: string;
  avatar: string;
  followers: {
    count: number;
    users: {id: string; alias: string; avatar: string;}[];
    more: boolean;
  };
  followees: {
    count: number;
    users: {id: string; alias: string; avatar: string;}[];
    more: boolean;
  };
  viewer:
    | {isFollowing: boolean; isFollowed: boolean; canPostHenken: boolean;}
    | undefined;
}> = ({
  className,
  alias,
  avatar,
  displayName,
  followees,
  followers,
  viewer,
}) => {
  const {LL} = useTranslation();
  return (
    <header
      className={clsx(
        className,
        [
          ['px-4', 'sm:px-8'],
          ['py-4', 'md:py-8', 'lg:py-12'],
        ],
        ['bg-blue-50'],
        ['shadow-xl'],
      )}
    >
      <div
        className={clsx(
          ['max-w-screen-lg'],
          ['mx-auto'],
          ['flex', ['flex-wrap']],
        )}
      >
        <div
          className={clsx(
            ['self-center'],
            ['place-self-center'],
            [
              ['w-16', 'sm:w-16', 'lg:w-24'],
              ['h-16', 'sm:h-16', 'lg:h-24'],
            ],
          )}
        >
          <AvatarLarge user={{alias, avatar}} />
        </div>
        <div
          className={clsx(
            ['flex-grow', 'lg:flex-grow-0'],
            ['w-auto', 'lg:w-64'],
            ['flex', ['flex-col'], ['justify-evenly']],
            ['ml-4'],
          )}
        >
          <h1>
            <span className={clsx(['text-lg', 'sm:text-xl'], ['select-all'])}>
              {displayName}
            </span>
            <span
              className={clsx(
                ['text-lg', 'sm:text-xl'],
                ['select-all'],
                ['text-gray-500'],
              )}
            >
              {LL.Format.Alias({alias})}
            </span>
          </h1>
          {viewer && (
            <Badges
              isFollowing={viewer.isFollowing}
              isFollowed={viewer.isFollowed}
              canPostHenken={viewer.canPostHenken}
            />
          )}
        </div>
        <div
          className={clsx(
            ['w-full', 'lg:w-auto'],
            ['flex-grow'],
            [
              ['mt-4', 'lg:mt-0'],
              ['ml-0', 'lg:ml-4'],
            ],
            [
              'flex',
              ['flex-col', 'sm:flex-row'],
              ['space-y-4', 'sm:space-y-0'],
              [
                'space-x-0',
                'sm:space-x-4',
                'md:space-x-8',
                'lg:space-x-8',
                'xl:space-x-8',
              ],
            ],
          )}
        >
          <div className={clsx(['flex', ['flex-row', 'sm:flex-col']])}>
            <span
              className={clsx(
                ['w-1/4', 'sm:w-full'],
                ['text-xs', 'sm:text-sm'],
              )}
            >
              {LL.Followees()}
            </span>
            <Followees
              className={clsx(['flex-grow'], ['sm:mt-2'])}
              alias={alias}
              followees={followees}
            />
          </div>
          <div className={clsx(['flex', ['flex-row', 'sm:flex-col']])}>
            <span
              className={clsx(
                ['w-1/4', 'sm:w-full'],
                ['text-xs', 'sm:text-sm'],
              )}
            >
              {LL.Followers()}
            </span>
            <Followers
              className={clsx(['flex-grow'], ['sm:mt-2'])}
              alias={alias}
              followers={followers}
            />
          </div>
          <div className={clsx(['sm:flex-grow'])}>
            {viewer && viewer.isFollowing &&
              <FollowButton className={clsx(['w-full'])} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export const Header: React.VFC<{
  className?: string;
  user: {
    id: string;
    alias: string;
    displayName: string;
    avatar: string;
    followers: {
      count: number;
      users: {id: string; alias: string; avatar: string;}[];
      more: boolean;
    };
    followees: {
      count: number;
      users: {id: string; alias: string; avatar: string;}[];
      more: boolean;
    };
  };
}> = ({user, ...props}) => {
  const pageContext = useContext(UserPageContext);

  const memoized = useMemo<
    {
      contextValue: ContextType<typeof UserPageHeaderContext>;
      componentValue: ComponentProps<typeof Component>['viewer'];
    } | null
  >(
    () =>
      pageContext.loggedIn
        ? {
          contextValue: {
            follow: pageContext.follow,
            callUnfollowPopup: () => {},
          },
          componentValue: {
            isFollowing: pageContext.isFollowing,
            isFollowed: pageContext.isFollowed,
            canPostHenken: pageContext.canPostsHenken,
          },
        }
        : null,
    [pageContext],
  );

  if (memoized) {
    return (
      <UserPageHeaderContext.Provider value={memoized.contextValue}>
        <Component {...props} {...user} viewer={memoized.componentValue} />
      </UserPageHeaderContext.Provider>
    );
  } else { return <Component {...props} {...user} viewer={undefined} />; }
};
