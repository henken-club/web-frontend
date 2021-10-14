import clsx from 'clsx';
import React from 'react';

export const Component: React.VFC<{
  className?: string;
  displayName: string;
}> = ({className}) => (
  <header
    className={clsx(
      className,
      [['px-4'], ['py-4']],
      ['col-span-1'],
      ['bg-blue-100'],
    )}
  >
    <h2>Header</h2>
  </header>
);

export const Header: React.VFC<{
  className?: string;
  user: {
    id: string;
    alias: string;
    displayName: string;
    avatar: string;
    followers: {
      count: number;
      users: {id: string; alias: string; avatar: string}[];
      more: boolean;
    };
    followees: {
      count: number;
      users: {id: string; alias: string; avatar: string}[];
      more: boolean;
    };
  };
}> = ({user, ...props}) => {
  return <Component {...props} displayName={user.displayName} />;
};
