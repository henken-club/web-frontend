import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';

export const IconLoading = (props) => (
  <FontAwesomeIcon icon={solid('spinner')} fixedWidth spin {...props} />
);

export const IconSettings = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('cog')} {...props} />
);

export const IconSignIn = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-to-bracket')} {...props} />
);
export const IconSignOut = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-from-bracket')} {...props} />
);
export const IconRegister = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('user-plus')} {...props} />
);

export const IconPostHenkens = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-from-bracket')} {...props} />
);
export const IconReceivedHenkens = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-to-bracket')} {...props} />
);

export const IconPostAnswers = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-from-bracket')} {...props} />
);
export const IconReceivedAnswers = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-to-bracket')} {...props} />
);
