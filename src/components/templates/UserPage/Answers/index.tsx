import clsx from 'clsx';
import React from 'react';

export const Component: React.VFC<{
  className?: string;
  displayName: string;
  count: number;
  hasMore: boolean;
  answers: {
    id: string;
    comment: string;
    postsTo: {
      id: string;
      alias: string;
      displayName: string;
      avatar: string;
    };
    henken: {
      id: string;
      comment: string;
      content:
        | {type: 'book'; value: {id: string; title: string;};}
        | {type: 'bookSeries'; value: {id: string; title: string;};}
        | {type: 'author'; value: {id: string; name: string;};};
    };
  }[];
}> = ({className}) => (
  <section className={clsx(className, ['col-span-1'], ['bg-blue-600'])}>
    <h2>
      送った回答
    </h2>
  </section>
);

export const Answers: React.VFC<{
  className?: string;
  user: {
    displayName: string;
    postsAnswers: {
      count: number;
      more: boolean;
      answers: {
        id: string;
        comment: string;
        postsTo: {
          id: string;
          alias: string;
          displayName: string;
          avatar: string;
        };
        henken: {
          id: string;
          comment: string;
          content:
            | {type: 'book'; value: {id: string; title: string;};}
            | {type: 'bookSeries'; value: {id: string; title: string;};}
            | {type: 'author'; value: {id: string; name: string;};};
        };
      }[];
    };
  };
}> = ({user, ...props}) => {
  return (
    <Component
      {...props}
      displayName={user.displayName}
      count={user.postsAnswers.count}
      hasMore={user.postsAnswers.more}
      answers={user.postsAnswers.answers}
    />
  );
};
