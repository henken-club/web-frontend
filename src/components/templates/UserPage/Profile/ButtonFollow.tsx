import clsx from 'clsx';
import React, {useContext} from 'react';

import {UserPageProfileContext} from './context';

import {IconFollow} from '~/components/Icon';
import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{className?: string; follow(): void}> = ({
  className,
  follow,
}) => {
  const {LL} = useTranslation();
  return (
    <button
      type="button"
      className={clsx(
        className,
        ['inline-flex', ['justify-center'], ['items-center']],
        ['bg-blue-400', 'hover:bg-blue-600'],
        [['text-white']],
        ['rounded-md'],
      )}
      onClick={() => follow()}
    >
      <IconFollow className={clsx(['text-sm'])} />
      <span className={clsx(['ml-2'], ['text-base'])}>
        {LL.UserPage.Profile.Follow()}
      </span>
    </button>
  );
};

export const FollowButton: React.VFC<{className?: string}> = ({...props}) => {
  const {follow} = useContext(UserPageProfileContext);

  return <Component {...props} follow={follow} />;
};
