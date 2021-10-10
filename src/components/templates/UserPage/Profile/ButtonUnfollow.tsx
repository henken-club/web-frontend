import clsx from 'clsx';
import React, {useContext} from 'react';

import {UserPageProfileContext} from './context';

export const UnfollowButton: React.VFC<{className?: string}> = ({
  className,
}) => {
  const {callUnfollowPopup: callUnfollow} = useContext(UserPageProfileContext);
  return <div className={clsx(className)} />;
};
