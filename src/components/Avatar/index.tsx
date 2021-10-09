import React from 'react';

import {Image} from '~/components/Image';

export const Avatar: React.VFC<{
  className?: string;
  alias: string;
  avatar: string;
}> = ({className, alias, avatar}) => (
  <Image width={96} height={96} src={avatar} alt={alias} />
);
