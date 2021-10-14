import clsx from 'clsx';
import React from 'react';

import {Viewer as ViewerComp} from './Viewer';

import {Viewer} from '~/auth/useViewer';

export const Component: React.VFC<{className?: string; viewer: Viewer;}> = ({
  className,
  viewer,
}) => (
  <div className={clsx(className, ['inline-flex', ['justify-center']])}>
    <ViewerComp viewer={viewer} />
  </div>
);
export const Registered = Component;
