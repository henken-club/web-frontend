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
    <div className={clsx(['grid', ['grid-cols-3', 'xl:grid-cols-4']])}>
      <Profile
        className={clsx(['grid-cols-1'])}
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
