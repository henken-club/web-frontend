import React from 'react';
import clsx from 'clsx';

import {LinkUser} from '~/components/Link';
import {AvatarSmall} from '~/components/Avatar';
import {useTranslation} from '~/i18n/useTranslation';

export const UsersGrid: React.VFC<{
  className?: string;
  linkMore: React.FC<{className?: string}>;
  users: {id: string; alias: string; avatar: string}[];
  more: boolean;
}> = ({className, users, more, linkMore: LinkMore}) => {
  const {LL} = useTranslation();
  return (
    <div
      className={clsx(className, [
        'inline-grid',
        ['grid-cols-6', 'sm:grid-cols-6'],
        ['gap-x-2'],
        ['gap-y-2'],
      ])}
    >
      {users.map((user) => (
        <LinkUser key={user.id} alias={user.alias}>
          <a
            className={clsx(
              ['col-span-1'],
              ['w-6'],
              ['h-6'],
              ['self-center'],
              ['place-self-center'],
            )}
          >
            <AvatarSmall user={user} />
          </a>
        </LinkUser>
      ))}
      {more && (
        <LinkMore>
          <a
            className={clsx(
              ['col-span-2'],
              ['self-center'],
              ['bg-blue-400'],
              ['inline-flex', ['items-center'], ['justify-center']],
              ['py-0.5'],
              ['rounded-md'],
            )}
          >
            <span className={clsx(['text-white'], ['text-sm'])}>
              {LL.UserPage.UserGrid.More()}
            </span>
          </a>
        </LinkMore>
      )}
    </div>
  );
};
