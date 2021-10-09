import clsx from 'clsx';
import React from 'react';
import {useFormContext} from 'react-hook-form';

import {FormValue} from '../FormValue';

import {useTranslation} from '~/i18n/useTranslation';

export const Picture: React.VFC<{className?: string; disabled: boolean}> = ({
  className,
  disabled,
}) => {
  const {LL} = useTranslation();

  const {register} = useFormContext<FormValue>();

  return (
    <label
      htmlFor="picture"
      className={clsx(className, ['flex', ['flex-col']])}
    >
      <span className={clsx(['mb-2'])}>{LL.RegisterForm.Avatar()}</span>
      <input
        {...register('picture')}
        name="picture"
        type="url"
        autoComplete="off"
        disabled={disabled}
        aria-label={LL.RegisterForm.aria.Avatar()}
      />
    </label>
  );
};
