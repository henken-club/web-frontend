import clsx from 'clsx';
import React from 'react';

import {IconRegistered} from '~/components/Icon';
import {TimerBar} from '~/components/TimerBar';
import {Image} from '~/components/Image';
import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  alias: string;
  displayName: string;
  avatar: string;
}> = ({className, displayName, avatar, alias}) => {
  const {LL} = useTranslation();
  return (
    <div
      className={clsx(
        className,
        ['px-12'],
        ['py-8'],
        [['bg-blue-400'], ['bg-opacity-75']],
        ['inline-flex', ['flex-col'], ['items-center'], ['justify-center']],
      )}
    >
      <div className={clsx(['space-x-2'], ['flex', ['items-center']])}>
        <div
          className={clsx(
            ['w-10'],
            ['h-10'],
            ['overflow-hidden'],
            ['rounded-full'],
          )}
        >
          <Image alt={alias} src={avatar} width={64} height={64} />
        </div>
        <IconRegistered className={clsx([['text-white'], ['text-4xl']])} />
      </div>
      <span
        className={clsx('mt-4', [['text-white'], ['text-base'], ['font-bold']])}
      >
        {LL.RegisterForm.Registered({displayName})}
      </span>
      <TimerBar
        className={clsx(['w-16'], ['h-1'], ['mt-2'], ['bg-white'])}
        duration={3000}
      />
    </div>
  );
};

export const Completed: React.VFC<{
  className?: string;
  viewer: {alias: string; displayName: string; avatar: string};
}> = ({viewer, ...props}) => {
  return <Component {...props} {...viewer} />;
};
