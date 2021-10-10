import clsx from 'clsx';
import React, {useContext} from 'react';

import {SearchBoxContext} from '../context';

import {useTranslation} from '~/i18n/useTranslation';

export const Component: React.VFC<{
  className?: string;
  onFocus(): void;
  onBlur(): void;
  onInputQuery: (query: string) => void;
}> = ({className, onInputQuery: onChange, onFocus, onBlur}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx(className, ['inline-flex'])}>
      <label className={clsx(['flex-grow'])}>
        <input
          onChange={(event) => onChange(event.currentTarget.value)}
          onFocus={onFocus}
          onBlur={onBlur}
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
  const {updateQuery, updateFocus} = useContext(SearchBoxContext);

  return (
    <Component
      {...props}
      onInputQuery={updateQuery}
      onFocus={() => updateFocus(true)}
      onBlur={() => updateFocus(false)}
    />
  );
};
