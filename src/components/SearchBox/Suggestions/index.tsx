import clsx from 'clsx';
import React, {useContext} from 'react';

import {SearchBoxContext, Suggestion} from '../context';

import {Author} from './Author';
import {Book} from './Book';
import {BookSeries} from './BookSeries';

import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  suggestions: [] | Suggestion[];
}> = ({className, suggestions}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx(className)}>
      {suggestions.length === 0 && <></>}
      {suggestions.length > 0 && (
        <div
          className={clsx(
            ['w-full'],
            ['inline-flex', ['flex-col']],
            ['divide-y', ['divide-gray-100']],
            ['shadow-lg'],
          )}
        >
          {suggestions.map((suggestion) => (
            <div key={suggestion.content.id}>
              {suggestion.type === 'author' && (
                <Author
                  className={clsx(['w-full'])}
                  value={suggestion.content}
                />
              )}
              {suggestion.type === 'book' && (
                <Book className={clsx(['w-full'])} value={suggestion.content} />
              )}
              {suggestion.type === 'bookSeries' && (
                <BookSeries
                  className={clsx(['w-full'])}
                  value={suggestion.content}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Suggestions: React.VFC<{className?: string}> = ({...props}) => {
  const {suggestions} = useContext(SearchBoxContext);

  if (!suggestions) return <></>;
  return <Component {...props} suggestions={suggestions} />;
};
