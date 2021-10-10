import React from 'react';

export const UserPageProfileContext = React.createContext<{
  callPostHenkenPopup(): void;
  follow(): void;
  callUnfollowPopup(): void;
}>({
  callPostHenkenPopup: () => {},
  follow: () => {},
  callUnfollowPopup: () => {},
});
