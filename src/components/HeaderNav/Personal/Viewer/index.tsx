import clsx from 'clsx';
import React, {ContextType, useContext} from 'react';
import styled from 'styled-components';

import {HeaderNavContext} from '../../context';

import {Accordion} from './Accordion';

import {AvatarSmall} from '~/components/Avatar';

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

export const Component: React.VFC<{
  className?: string;
  viewer: {id: string; alias: string; displayName: string; avatar: string;};
  onFocus(): void;
  onBlur(): void;
}> = ({className, viewer, onFocus, onBlur}) => {
  return (
    <Details
      className={clsx(className, ['relative'], ['inline-flex'])}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <summary className={clsx(['flex'], ['cursor-pointer'])}>
        <div className={clsx(['w-12'], ['h-12'])}>
          <AvatarSmall user={{alias: viewer.alias, avatar: viewer.avatar}} />
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

export const Viewer: React.VFC<{
  className?: string;
  viewer: {id: string; alias: string; displayName: string; avatar: string;};
}> = ({...props}) => {
  const {onFocus, onBlur} = useContext<ContextType<typeof HeaderNavContext>>(
    HeaderNavContext,
  );
  return <Component {...props} onFocus={onFocus} onBlur={onBlur} />;
};
