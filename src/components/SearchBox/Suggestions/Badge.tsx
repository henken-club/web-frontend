import clsx from 'clsx';
import React from 'react';

import {IconAuthor, IconBook, IconBookSeries} from '~/components/Icon';
import {useTranslation} from '~/i18n/useTranslation';

export const BadgeTemplate: React.VFC<{
  className?: string;
  icon: React.VFC<{className?: string}>;
  text: string;
}> = ({className, icon: Icon, text}) => {
  return (
    <div
      className={clsx(
        className,
        ['inline-flex', ['items-center']],
        [['px-2'], ['py-1']],
        [['text-white']],
        ['rounded-md'],
      )}
    >
      <Icon className={clsx(['text-xs'])} />
      <span className={clsx(['ml-1'], ['text-sm'], ['leading-4'])}>{text}</span>
    </div>
  );
};

export const BadgeAuthor: React.VFC<{
  className?: string;
}> = ({className, ...props}) => {
  const {LL} = useTranslation();
  return (
    <BadgeTemplate
      {...props}
      className={clsx(className, ['bg-red-400'])}
      icon={IconAuthor}
      text={LL.SearchBox.Suggestions.Author()}
    />
  );
};

export const BadgeBook: React.VFC<{
  className?: string;
}> = ({className, ...props}) => {
  const {LL} = useTranslation();
  return (
    <BadgeTemplate
      {...props}
      className={clsx(className, ['bg-green-400'])}
      icon={IconBook}
      text={LL.SearchBox.Suggestions.Book()}
    />
  );
};

export const BadgeBookSeries: React.VFC<{
  className?: string;
}> = ({className, ...props}) => {
  const {LL} = useTranslation();
  return (
    <BadgeTemplate
      {...props}
      className={clsx(className, ['bg-blue-400'])}
      icon={IconBookSeries}
      text={LL.SearchBox.Suggestions.BookSeries()}
    />
  );
};
