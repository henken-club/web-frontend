import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCog,
  faRightFromBracket,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

export type IconType = React.VFC<{className?: string}>;

export const IconSettings: IconType = (props) => (
  <FontAwesomeIcon fixedWidth icon={faCog} {...props} />
);

export const IconSignIn: IconType = (props) => (
  <FontAwesomeIcon fixedWidth icon={faRightToBracket} {...props} />
);
export const IconSignOut: IconType = (props) => (
  <FontAwesomeIcon fixedWidth icon={faRightFromBracket} {...props} />
);

export const IconPostHenkens: IconType = (props) => (
  <FontAwesomeIcon fixedWidth icon={faRightFromBracket} {...props} />
);
export const IconReceivedHenkens: IconType = (props) => (
  <FontAwesomeIcon fixedWidth icon={faRightToBracket} {...props} />
);

export const IconPostAnswers: IconType = (props) => (
  <FontAwesomeIcon fixedWidth icon={faRightFromBracket} {...props} />
);
export const IconReceivedAnswers: IconType = (props) => (
  <FontAwesomeIcon fixedWidth icon={faRightToBracket} {...props} />
);
