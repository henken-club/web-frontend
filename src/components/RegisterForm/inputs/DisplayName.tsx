import clsx from 'clsx';
import React from 'react';
import {useFormContext} from 'react-hook-form';

import {FormValue} from '../FormValue';

import {useAuth} from '~/auth/useAuth';
import {useTranslation} from '~/i18n/useTranslation';

export const DisplayName: React.VFC<{className?: string; disabled: boolean;}> =
  ({className, disabled}) => {
    const {LL} = useTranslation();
    const {register} = useFormContext<FormValue>();

    const {user} = useAuth();

    return (
      <label
        htmlFor="displayName"
        className={clsx(className, ['inline-flex', ['flex-col']])}
      >
        <span className={clsx(['mb-2'], ['text-sm'])}>
          {LL.RegisterForm.DisplayName()}
        </span>
        <input
          {...register('displayName')}
          className={clsx(
            ['px-2'],
            ['py-1'],
            ['bg-blue-50'],
            ['border', ['border-blue-400']],
            ['rounded'],
          )}
          name="displayName"
          type="text"
          autoComplete="off"
          disabled={disabled}
          aria-label={LL.RegisterForm.aria.DisplayName()}
        />
      </label>
    );
  };
