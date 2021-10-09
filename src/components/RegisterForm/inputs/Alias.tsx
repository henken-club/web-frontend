import clsx from 'clsx';
import React from 'react';
import {useFormContext} from 'react-hook-form';

import {FormValue} from '../FormValue';

import {useTranslation} from '~/i18n/useTranslation';

export const Alias: React.VFC<{className?: string; disabled: boolean}> = ({
  className,
  disabled,
}) => {
  const {LL} = useTranslation();
  const {register} = useFormContext<FormValue>();
  return (
    <label
      htmlFor="alias"
      className={clsx(className, ['inline-flex', ['flex-col']])}
    >
      <span className={clsx(['mb-2'], ['text-sm'])}>
        {LL.RegisterForm.Alias()}
      </span>
      <input
        {...register('alias')}
        className={clsx(
          ['px-2'],
          ['py-1'],
          ['bg-blue-50'],
          ['border', ['border-blue-400']],
          ['rounded'],
        )}
        name="alias"
        type="text"
        autoComplete="off"
        disabled={disabled}
        aria-label={LL.RegisterForm.aria.Alias()}
      />
    </label>
  );
};
