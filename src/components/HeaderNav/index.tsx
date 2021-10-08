import clsx from 'clsx';
import React from 'react';

import {Personal} from './Personal';

export const HeaderNav: React.VFC<{className?: string}> = ({className}) => {
  return (
    <nav
      className={clsx(
        className,
        ['h-16'],
        [['flex'], ['items-center']],
        ['bg-blue-100'],
      )}
    >
      <div className={clsx(['container'], ['mx-auto'])}>
        <Personal />
      </div>
    </nav>
  );
};
