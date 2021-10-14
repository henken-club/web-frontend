import clsx from 'clsx';
import React from 'react';

import {BookType} from '../context';

import {BadgeBook} from './Badge';

import {LinkBook} from '~/components/Link';
import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  id: string;
  title: string;
  authors: {id: string; name: string;}[];
}> = ({className, id, title, authors}) => {
  const {LL} = useTranslation();
  return (
    <LinkBook id={id}>
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
          <div className={clsx(['flex-grow'], ['flex-col'])}>
            <span className={clsx(['text-lg'])}>{title}</span>
            <div className={clsx(['flex'], ['space-x-1'])}>
              {authors.map(({id, name}) => (
                <span key={id} className={clsx(['text-sm'])}>
                  {name}
                </span>
              ))}
            </div>
          </div>
          <BadgeBook className={clsx(['ml-4'])} />
        </div>
      </a>
    </LinkBook>
  );
};

export const Book: React.VFC<{
  className?: string;
  value: BookType;
}> = ({value, ...props}) => <Component {...props} {...value} />;
