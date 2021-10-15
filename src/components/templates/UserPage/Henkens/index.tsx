import clsx from 'clsx';
import React from 'react';

export const Component: React.VFC<{
  className?: string;
  displayName: string;
  count: number;
  hasMore: boolean;
  henkens: {
    id: string;
    comment: string;
    postsTo: {id: string; alias: string; displayName: string; avatar: string};
    content:
      | {type: 'author'; value: {id: string; name: string}}
      | {type: 'book'; value: {id: string; title: string}}
      | {type: 'bookSeries'; value: {id: string; title: string}};
  }[];
}> = ({className}) => (
  <div className={clsx(className, ['col-span-1'], ['bg-blue-600'])}>
    <h2>送った偏見</h2>
  </div>
);

export const Henkens: React.VFC<{
  className?: string;
  user: {
    displayName: string;
    postsHenkens: {
      count: number;
      more: boolean;
      henkens: {
        id: string;
        comment: string;
        postsTo: {
          id: string;
          alias: string;
          displayName: string;
          avatar: string;
        };
        content:
          | {type: 'author'; value: {id: string; name: string}}
          | {type: 'book'; value: {id: string; title: string}}
          | {type: 'bookSeries'; value: {id: string; title: string}};
      }[];
    };
  };
}> = ({user, ...props}) => {
  return (
    <Component
      {...props}
      displayName={user.displayName}
      count={user.postsHenkens.count}
      hasMore={user.postsHenkens.more}
      henkens={user.postsHenkens.henkens}
    />
  );
};
