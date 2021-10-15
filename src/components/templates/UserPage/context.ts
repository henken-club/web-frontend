import React from 'react';

export const UserPageContext = React.createContext<
  | {
    loggedIn: false;
  }
  | {
    loggedIn: true;
    isFollowing: boolean;
    isFollowed: boolean;
    canPostsHenken: boolean;
    follow(): void;
    unfollow(): void;
    postHenken(): void;
  }
>({loggedIn: false});
