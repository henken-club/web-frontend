import clsx from 'clsx';
import React from 'react';

export const CannotPostHenken: React.VFC<{className?: string}> = ({
  className,
}) => <div className={clsx(className)} />;
