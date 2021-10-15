import clsx from 'clsx';
import React, {useContext} from 'react';

import {SearchBoxContext, Suggestion} from '../context';

import {Author} from './Author';
import {Book} from './Book';
import {BookSeries} from './BookSeries';

import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  suggestions: {nodes: [] | Suggestion[];};
}> = ({className, suggestions: {nodes}}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx(className)}>
      {nodes.length === 0 && <></>}
      {nodes.length > 0 && (
        <div
          className={clsx(
            ['w-full'],
            ['inline-flex', ['flex-col']],
            ['divide-y', ['divide-gray-100']],
            ['shadow-lg'],
          )}
        >
          {nodes.map((node) => (
            <div key={node.content.id}>
              {node.type === 'author' &&
                <Author className={clsx(['w-full'])} value={node.content} />}
              {node.type === 'book' &&
                <Book className={clsx(['w-full'])} value={node.content} />}
              {node.type === 'bookSeries' &&
                (
                  <BookSeries
                    className={clsx(['w-full'])}
                    value={node.content}
                  />
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Suggestions: React.VFC<{className?: string;}> = ({...props}) => {
  const {suggestions} = useContext(SearchBoxContext);

  if (!suggestions)
    return <></>;
  return <Component {...props} suggestions={suggestions} />;
};
