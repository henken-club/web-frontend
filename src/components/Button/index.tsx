import React from 'react';
import clsx from 'clsx';

import {IconType} from '../Icon';

export const ButtonTemplate: React.VFC<{
  className?: string;
  onClick(): void;
  icon?: IconType;
  text: React.VFC<{className?: string}>;
}> = ({className, onClick, icon: Icon, text: Text}) => (
  <button className={clsx(className)} type="button" onClick={onClick}>
    {Icon && <Icon />}
    <Text />
  </button>
);

export type ButtonProps = {
  className?: string;
  onClick(): void;
  icon?: IconType;
  text: string;
};
export const ButtonNormal: React.VFC<ButtonProps> = ({
  className,
  text,
  icon: Icon,
  ...props
}) => (
  <ButtonTemplate
    {...props}
    className={clsx(
      className,
      ['inline-flex', ['items-center']],
      [['px-3'], ['py-1']],
      ['bg-blue-400', 'hover:bg-blue-600'],
      [['text-white'], ['text-base']],
      ['rounded-md'],
    )}
    // eslint-disable-next-line @shopify/jsx-no-complex-expressions
    icon={
      Icon
        ? ({className, ...props}) => (
            <Icon {...props} className={clsx(className, 'text-xs')} />
          )
        : undefined
    }
    text={({className, ...props}) => (
      <span {...props} className={clsx(className, [{'ml-1': Boolean(Icon)}])}>
        {text}
      </span>
    )}
  />
);
