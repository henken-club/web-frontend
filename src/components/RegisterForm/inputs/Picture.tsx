import clsx from 'clsx';
import React from 'react';
import {useFormContext} from 'react-hook-form';

import {FormValue} from '../FormValue';

import {Image} from '~/components/Image';
import {useTranslation} from '~/i18n/useTranslation';

export const Picture: React.VFC<{className?: string; disabled: boolean;}> = ({
  className,
  disabled,
}) => {
  const {LL} = useTranslation();

  const {register, getValues} = useFormContext<FormValue>();
  const {avatar: avatarUrl} = getValues();

  return (
    <label
      htmlFor="picture"
      className={clsx(className, ['flex', ['flex-col']])}
    >
      <span className={clsx(['mb-2'], ['text-sm'])}>
        {LL.RegisterForm.Avatar()}
      </span>
      <div className={clsx(['flex', ['items-center']])}>
        <div className={clsx(['w-8'], ['h-8'])}>
          <Image
            className={clsx(['rounded-full'])}
            alt={avatarUrl}
            src={avatarUrl}
            width={96}
            height={96}
          />
        </div>
        <input
          {...register('avatar')}
          className={clsx(
            ['flex-grow'],
            [['px-2'], ['py-1']],
            ['ml-2'],
            [['text-sm'], ['text-gray-400']],
            ['bg-gray-100'],
            ['border', ['border-gray-300']],
            ['rounded'],
          )}
          name="picture"
          type="url"
          autoComplete="off"
          readOnly
          disabled={disabled}
          aria-label={LL.RegisterForm.aria.Avatar()}
        />
      </div>
    </label>
  );
};
