import React, {ComponentProps, ContextType, useMemo} from 'react';
import clsx from 'clsx';
import {gql} from 'graphql-tag';

import {Profile} from './Profile';
import {UserPageContext} from './context';

import {useTranslation} from '~/i18n/useTranslation';
import {useUserPageWithViewerQuery} from '~/components/codegen';
import {useViewer} from '~/auth/useViewer';

const UserPageWithViewer = gql`
  query UserPageWithViewer($id: ID!) {
    viewer {
      isFollowing(id: $id)
      canPostHenken(id: $id)
    }
  }
`;

export const Component: React.VFC<{
  user: ComponentProps<typeof Profile>['user'];
}> = ({user}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx(['flex', ['flex-col', 'lg:flex-row']])}>
      <div className={clsx(['flex', ['flex-col']])}>
        <Profile
          className={clsx([])}
          user={{
            id: user.id,
            alias: user.alias,
            displayName: user.displayName,
            avatar: user.avatar,
            followees: user.followees,
            followers: user.followers,
          }}
        />
      </div>
      <div
        className={clsx(
          ['flex-grow'],
          [
            ['mt-4', 'lg:mt-0'],
            ['ml-0', 'lg:ml-4'],
          ],
          ['grid', ['grid-cols-2', 'grid-cols-3']],
        )}
      >
        <div
          className={clsx(
            ['h-8'],
            [
              ['col-span-full', 'col-span-2'],
              ['col-start-1'],
              ['xl:col-end-3'],
              ['order-1'],
            ],
            ['bg-blue-300'],
          )}
        >
          <p>PostForm</p>
        </div>
        <div
          className={clsx(
            [
              ['col-span-full', 'xl:col-span-1'],
              ['col-start-1', 'xl:col-start-3'],
              ['order-3', 'xl:order-4'],
            ],
            ['grid', ['grid-cols-1', 'sm:grid-cols-2', 'xl:grid-cols-1']],
          )}
        >
          <div className={clsx(['h-8'], ['col-span-1'], ['bg-blue-500'])}>
            <p>Posted</p>
          </div>
          <div className={clsx(['h-8'], ['col-span-1'], ['bg-blue-600'])}>
            <p>Posts</p>
          </div>
        </div>
        <div
          className={clsx(
            ['h-8'],
            [
              ['col-span-full', 'xl:col-span-2'],
              ['xl:col-start-1'],
              ['order-4', 'xl:order-3'],
            ],
            ['bg-blue-400'],
          )}
        >
          <p>Timeline</p>
        </div>
      </div>
    </div>
  );
};

export const TemplateUserPage: React.VFC<{
  className?: string;
  user: ComponentProps<typeof Component>['user'];
}> = ({user, ...props}) => {
  const viewer = useViewer();
  const [result] = useUserPageWithViewerQuery({
    pause: !viewer,
    variables: {id: user.id},
  });

  const contextValue = useMemo<ContextType<typeof UserPageContext>>(() => {
    if (result.data?.viewer)
      return {
        isFollowing: result.data.viewer.isFollowing,
        canPostsHenken: result.data.viewer.canPostHenken,
        follow: () => {},
        unfollow: () => {},
        postHenken: () => {},
      };
    return {
      isFollowing: false,
      canPostsHenken: false,
      follow: () => {},
      unfollow: () => {},
      postHenken: () => {},
    };
  }, [result.data?.viewer]);

  return (
    <UserPageContext.Provider value={contextValue}>
      <Component {...props} user={user} />
    </UserPageContext.Provider>
  );
};
