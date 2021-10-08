import React from 'react';
import clsx from 'clsx';

import {IconLoading} from '~/components/Icon';

export const Component: React.VFC<{className?: string}> = ({className}) => (
  <div className={clsx(className, ['inline-flex'])}>
    <IconLoading className={clsx(['text-lg'], ['text-blue-500'])} />
  </div>
);
export const Fetching = Component;
