import React from 'react';
import styled, {keyframes} from 'styled-components';

const ShrinkX = keyframes`
  from {
    transform: scaleX(1)
  }

  to {
    transform: scaleX(0)
  }
`;

const AnimatedDiv = styled.div<{duration: number;}>`
  transform-origin: left;
  animation-name: ${ShrinkX};
  animation-duration: ${(props) => props.duration}ms;
  animation-delay: 0;
  animation-timing-function: linear;
  animation-fill-mode: both;
`;

export const TimerBar: React.VFC<{className?: string; duration: number;}> = ({
  ...props
}) => <AnimatedDiv {...props} />;
