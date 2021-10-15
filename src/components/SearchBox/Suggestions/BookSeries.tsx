import clsx from 'clsx';
import React from 'react';

import {BookSeriesType} from '../context';

import {BadgeBookSeries} from './Badge';

import {LinkBookSeries} from '~/components/Link';
import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  id: string;
  title: string;
}> = ({className, id, title}) => {
  const {LL} = useTranslation();
  return (
    <LinkBookSeries id={id}>
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
          <span className={clsx(['flex-grow'], [['text-lg']])}>{title}</span>
          <BadgeBookSeries className={clsx(['ml-4'])} />
        </div>
      </a>
    </LinkBookSeries>
  );
};

export const BookSeries: React.VFC<{
  className?: string;
  value: BookSeriesType;
}> = ({value, ...props}) => <Component {...props} {...value} />;
