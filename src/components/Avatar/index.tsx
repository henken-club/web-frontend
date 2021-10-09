import clsx from 'clsx';
import React from 'react';

import {Image} from '~/components/Image';

export const Avatar: React.VFC<{
  user: {alias: string; avatar: string};
}> = ({user: {alias, avatar}}) => (
  <Image
    className={clsx(['rounded-full'])}
    width={96}
    height={96}
    src={avatar}
    alt={alias}
  />
);
