import clsx from 'clsx';
import React, {useContext} from 'react';

import {UserPageProfileContext} from './context';

export const PostHenkenButton: React.VFC<{className?: string}> = ({
  className,
}) => {
  const {callPostHenkenPopup: callPostHenken} = useContext(
    UserPageProfileContext,
  );
  return <div className={clsx(className)} />;
};
