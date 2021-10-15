import React, {ComponentProps, ContextType, useMemo} from 'react';
import clsx from 'clsx';
import {gql} from 'graphql-tag';

import {UserPageContext} from './context';
import {Henkens} from './Henkens';
import {Answers} from './Answers';
import {Header} from './Header';

import {useTranslation} from '~/i18n/useTranslation';
import {useUserPageWithViewerQuery} from '~/components/codegen';
import {useViewer} from '~/auth/useViewer';

const UserPageWithViewer = gql`
  query UserPageWithViewer($id: ID!) {
    viewer {
      isFollowing(id: $id)
      isFollowed(id: $id)
      canPostHenken(id: $id)
    }
  }
`;

export const Component: React.VFC<{
  user: ComponentProps<typeof Header>['user'] &
    ComponentProps<typeof Henkens>['user'] &
    ComponentProps<typeof Answers>['user'];
}> = ({user}) => {
  const {LL} = useTranslation();
  return (
    <div className={clsx()}>
      <Header
        className={clsx(['w-full'])}
        user={{
          id: user.id,
          alias: user.alias,
          displayName: user.displayName,
          avatar: user.avatar,
          followees: user.followees,
          followers: user.followers,
        }}
      />
      <div
        className={clsx(
          [['py-4']],
          ['flex', ['flex-col', 'lg:flex-row']],
          [['space-y-4', 'lg:space-y-0'], ['lg:space-x-4']],
        )}
      >
        <div
          className={clsx(
            [['w-full', 'lg:w-1/3', 'xl:w-1/4'], ['lg:max-w-screen-xs']],
            ['grid', ['grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-1']],
            [['gap-x-4'], ['gap-y-4']],
          )}
        >
          <Henkens
            className={clsx(['bg-blue-200'])}
            user={{
              displayName: user.displayName,
              postsHenkens: user.postsHenkens,
            }}
          />
          <Answers
            className={clsx(['bg-blue-300'])}
            user={{
              displayName: user.displayName,
              postsAnswers: user.postsAnswers,
            }}
          />
        </div>
        <div
          className={clsx(['flex-grow'], ['flex', ['flex-col']], ['space-y-4'])}
        >
          <section
            className={clsx(
              [['col-start-2'], ['col-end-3'], ['row-start-1'], ['row-end-2']],
              ['w-full'],
              ['bg-blue-400'],
            )}
          >
            <h2>フォーム</h2>
          </section>
          <section
            className={clsx(
              [['col-start-2'], ['col-end-3'], ['row-start-2'], ['row-end-3']],
              ['bg-blue-500'],
            )}
          >
            <h2>タイムライン</h2>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TemplateUserPage: React.VFC<{
  className?: string;
  user: {
    id: string;
    alias: string;
    displayName: string;
    avatar: string;
    followees: {
      count: number;
      more: boolean;
      users: {
        id: string;
        alias: string;
        avatar: string;
      }[];
    };
    followers: {
      count: number;
      more: boolean;
      users: {
        id: string;
        alias: string;
        avatar: string;
      }[];
    };
    postsHenkens: {
      count: number;
      more: boolean;
      henkens: {
        id: string;
        comment: string;
        content:
          | {type: 'book'; value: {id: string; title: string}}
          | {type: 'bookSeries'; value: {id: string; title: string}}
          | {type: 'author'; value: {id: string; name: string}};
        postsTo: {
          id: string;
          alias: string;
          displayName: string;
          avatar: string;
        };
        answer: {
          id: string;
          type: 'right' | 'wrong';
          comment: string;
        } | null;
      }[];
    };
    postsAnswers: {
      count: number;
      more: boolean;
      answers: {
        id: string;
        type: 'right' | 'wrong';
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
            | {type: 'book'; value: {id: string; title: string}}
            | {type: 'bookSeries'; value: {id: string; title: string}}
            | {type: 'author'; value: {id: string; name: string}};
        };
      }[];
    };
  };
}> = ({user, ...props}) => {
  const viewer = useViewer();
  const [result] = useUserPageWithViewerQuery({
    pause: !viewer,
    variables: {id: user.id},
  });

  const contextValue = useMemo<ContextType<typeof UserPageContext>>(() => {
    if (result.data?.viewer)
      return {
        loggedIn: true,
        isFollowing: result.data.viewer.isFollowing,
        isFollowed: result.data.viewer.isFollowed,
        canPostsHenken: result.data.viewer.canPostHenken,
        follow: () => {},
        unfollow: () => {},
        postHenken: () => {},
      };
    return {
      loggedIn: false,
    };
  }, [result.data?.viewer]);

  return (
    <UserPageContext.Provider value={contextValue}>
      <Component {...props} user={user} />
    </UserPageContext.Provider>
  );
};
