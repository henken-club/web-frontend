import clsx from 'clsx';
import React from 'react';

import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{className?: string}> = ({className}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx(className, ['inline-flex'])}>
      <label className={clsx(['flex-grow'])}>
        <input
          type="search"
          autoComplete="on"
          aria-label={LL.SearchBox.aria.SearchInput()}
          className={clsx(
            ['w-full'],
            ['px-4'],
            ['py-2'],
            ['bg-gray-50'],
            ['border'],
            [['text-md'], ['text-gray-800']],
          )}
        />
      </label>
    </div>
  );
};
export const Input: React.VFC<{className?: string}> = ({...props}) => {
  return <Component {...props} />;
};
