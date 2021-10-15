import clsx from 'clsx';
import React from 'react';

import {useTranslation} from '~/i18n/useTranslation';

export const BadgeFollowed: React.VFC<{
  className?: string;
}> = ({className}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx(className, ['inline-flex'])}>
      <span className={clsx(['text-xs'])}>
        {LL.UserPage.Header.IsFollowed()}
      </span>
    </div>
  );
};

export const BadgeCanPost: React.VFC<{
  className?: string;
}> = ({className}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx(className, ['inline-flex'])}>
      <span className={clsx(['text-xs'])}>
        {LL.UserPage.Header.CanPostHenken()}
      </span>
    </div>
  );
};

export const Component: React.VFC<{
  className?: string;
  isFollowing: boolean;
  isFollowed: boolean;
  canPostHenken: boolean;
}> = ({className, isFollowed, isFollowing, canPostHenken}) => (
  <div
    className={clsx(
      className,
      [
        'inline-flex',
        ['flex-col', 'sm:flex-row'],
        ['justify-evenly', 'sm:justify-start'],
        ['sm:items-center'],
      ],
      ['space-x-0', 'sm:space-x-2'],
    )}
  >
    {isFollowed && <BadgeFollowed />}
    {canPostHenken && <BadgeCanPost />}
  </div>
);

export const Badges = Component;
