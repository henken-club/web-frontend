import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

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
export const IconRegistered = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('hands-clapping')} {...props} />
);

export const IconPostHenkens = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-from-bracket')} {...props} />
);
export const IconReceivedHenkens = (props) => (
  <FontAwesomeIcon
    fixedWidth
    icon={solid('right-to-bracket')}
    {...props}
  />
);

export const IconPostAnswers = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('right-from-bracket')} {...props} />
);
export const IconReceivedAnswers = (props) => (
  <FontAwesomeIcon
    fixedWidth
    icon={solid('right-to-bracket')}
    {...props}
  />
);

export const IconAuthor = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('pen-nib')} {...props} />
);
export const IconBook = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('book')} {...props} />
);
export const IconBookSeries = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('bars-staggered')} {...props} />
);

export const IconFollow = (props) => (
  <FontAwesomeIcon fixedWidth icon={solid('user-plus')} {...props} />
);
