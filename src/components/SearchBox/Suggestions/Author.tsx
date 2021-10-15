import clsx from 'clsx';
import React from 'react';

import {AuthorType} from '../context';

import {BadgeAuthor} from './Badge';

import {LinkAuthor} from '~/components/Link';
import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  id: string;
  name: string;
}> = ({className, id, name}) => {
  const {LL} = useTranslation();
  return (
    <LinkAuthor id={id}>
      <a
        className={clsx(
          className,
          ['px-4'],
          ['py-2'],
          ['inline-flex'],
          ['bg-white', 'hover:bg-blue-50'],
        )}
      >
        <div className={clsx(['w-full'], ['flex', ['items-center']])}>
          <span className={clsx(['flex-grow'], [['text-lg']])}>{name}</span>
          <BadgeAuthor className={clsx(['ml-4'])} />
        </div>
      </a>
    </LinkAuthor>
  );
};

export const Author: React.VFC<{
  className?: string;
  value: AuthorType;
}> = ({value, ...props}) => <Component {...props} {...value} />;
