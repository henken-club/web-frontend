import React, {ComponentProps} from 'react';
import clsx from 'clsx';

import {Profile} from './Profile';

import {useTranslation} from '~/i18n/useTranslation';

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
}> = ({...props}) => {
  return <Component {...props} />;
};
