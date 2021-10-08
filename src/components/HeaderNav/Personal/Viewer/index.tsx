import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

import {Accordion} from './Accordion';

import {Image} from '~/components/Image';

const Details = styled.details`
  & > summary::-webkit-details-marker {
    display: none;
  }

  & > summary:before {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }

  &:not([open]) > summary::before {
    display: none;
  }
`;

export type ViewerProps = {
  className?: string;
  viewer: {id: string; alias: string; displayName: string; avatar: string};
};
export const Viewer: React.VFC<ViewerProps> = ({className, viewer}) => {
  return (
    <Details className={clsx(className, ['relative'], ['inline-flex'])}>
      <summary className={clsx(['flex'], ['cursor-pointer'])}>
        <div className={clsx(['w-12'], ['h-12'])}>
          <Image
            className={clsx(['rounded-full'])}
            src={viewer.avatar}
            alt={viewer.alias}
            width={64}
            height={64}
          />
        </div>
      </summary>
      <Accordion
        className={clsx(
          [['absolute'], ['top-full'], ['right-0']],
          ['mt-1'],
          ['z-1'],
        )}
        viewer={viewer}
      />
    </Details>
  );
};
