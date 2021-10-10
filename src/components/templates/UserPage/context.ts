import React from 'react';

export const UserPageContext = React.createContext<{
  isFollowing: boolean;
  canPostsHenken: boolean;
  follow(): void;
  unfollow(): void;
  postHenken(): void;
}>({
  isFollowing: false,
  canPostsHenken: false,
  follow: () => {},
  unfollow: () => {},
  postHenken: () => {},
});
