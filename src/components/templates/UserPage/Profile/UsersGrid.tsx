import React from 'react';
import clsx from 'clsx';

import {LinkUser, LinkUserFollowers} from '~/components/Link';
import {AvatarSmall} from '~/components/Avatar';
import {useTranslation} from '~/i18n/useTranslation';

export const UsersGrid: React.VFC<{
  className?: string;
  link: React.FC<{className?: string}>;
  users: {id: string; alias: string; avatar: string}[];
  more: boolean;
}> = ({className, users, more, link: Link}) => {
  const {LL} = useTranslation();
  return (
    <div
      className={clsx(className, [
        'inline-grid',
        ['grid-cols-4', 'md:grid-cols-6', 'xl:grid-cols-4'],
        ['gap-x-2'],
        ['gap-y-2'],
      ])}
    >
      {users.map((user) => (
        <LinkUser key={user.id} alias={user.alias}>
          <a className={clsx(['col-span-1'], ['w-6'], ['h-6'])}>
            <AvatarSmall user={user} />
          </a>
        </LinkUser>
      ))}
      {more && (
        <Link>
          <a
            className={clsx(
              ['col-span-2'],
              ['bg-blue-400'],
              [['text-center'], ['text-white'], ['text-sm']],
              ['rounded-md'],
            )}
          >
            {LL.UserPage.UserGrid.More()}
          </a>
        </Link>
      )}
    </div>
  );
};

export const Followers: React.VFC<{
  className?: string;
  alias: string;
  followers: {
    users: {id: string; alias: string; avatar: string}[];
    more: boolean;
  };
}> = ({alias, followers, ...props}) => (
  <UsersGrid
    {...props}
    {...followers}
    link={({...props}) => <LinkUserFollowers alias={alias} {...props} />}
  />
);

export const Followees: React.VFC<{
  className?: string;
  alias: string;
  followees: {
    users: {id: string; alias: string; avatar: string}[];
    more: boolean;
  };
}> = ({alias, followees, ...props}) => (
  <UsersGrid
    {...props}
    {...followees}
    link={({...props}) => <LinkUserFollowers alias={alias} {...props} />}
  />
);
