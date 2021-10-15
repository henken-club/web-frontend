import React from 'react';

export const UserPageHeaderContext = React.createContext<{
  follow(): void;
  callUnfollowPopup(): void;
}>({
  follow() {},
  callUnfollowPopup() {},
});
