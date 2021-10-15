import clsx from 'clsx';
import React from 'react';

import {AvatarSmall} from '~/components/Avatar';
import {
  IconPostAnswers,
  IconPostHenkens,
  IconReceivedAnswers,
  IconReceivedHenkens,
  IconSettings,
  IconSignOut,
  IconType,
} from '~/components/Icon';
import {
  LinkSettings,
  LinkUser,
  LinkUserPostsAnswers,
  LinkUserPostsHenkens,
  LinkUserReceivedAnswers,
  LinkUserReceivedHenkens,
} from '~/components/Link';
import {useTranslation} from '~/i18n/useTranslation';

export const AccordionItem: React.VFC<{
  className?: string;
  link: React.FC<{className?: string;}>;
  icon: IconType;
  text: string;
}> = ({className, link: Link, icon: Icon, text}) => (
  <Link>
    <a
      className={clsx(
        className,
        [['px-3'], ['py-3']],
        [['flex'], ['items-center']],
        ['bg-white', 'hover:bg-blue-100'],
      )}
    >
      <Icon className={clsx(['text-sm'])} />
      <span className={clsx(['ml-2'], ['text-xs'], ['whitespace-nowrap'])}>
        {text}
      </span>
    </a>
  </Link>
);
export type AccordionProps = {
  className?: string;
  viewer: {id: string; alias: string; displayName: string; avatar: string;};
};
export const Accordion: React.VFC<AccordionProps> = ({className, viewer}) => {
  const {LL} = useTranslation();
  return (
    <div
      className={clsx(
        className,
        ['w-64'],
        [['inline-flex'], ['flex-col']],
        ['border', ['border-gray-200']],
        ['overflow-hidden'],
        ['rounded-lg'],
        ['shadow-lg'],
      )}
    >
      <LinkUser alias={viewer.alias}>
        <a
          className={clsx(
            [['px-4'], ['py-2']],
            [['flex'], ['items-center']],
            ['bg-white', 'hover:bg-blue-100'],
          )}
        >
          <div className={clsx(['w-10'], ['h-10'])}>
            <AvatarSmall user={{alias: viewer.alias, avatar: viewer.avatar}} />
          </div>
          <div className={clsx(['ml-4'], [['flex'], ['flex-col']])}>
            <span className={clsx(['font-bold'], ['text-sm'])}>
              {viewer.displayName}
            </span>
            <span className={clsx(['text-sm'])}>{viewer.alias}</span>
          </div>
        </a>
      </LinkUser>
      <div
        className={clsx(
          [['grid'], ['grid-cols-2']],
          ['border-t', ['border-gray-200']],
        )}
      >
        <AccordionItem
          className={clsx(['col-span-1'])}
          link={(props) => (
            <LinkUserPostsHenkens alias={viewer.alias} {...props} />
          )}
          icon={IconPostHenkens}
          text={LL.HeaderNav.Accordion.PostsHenkens()}
        />
        <AccordionItem
          className={clsx(['col-span-1'])}
          link={(props) => (
            <LinkUserReceivedHenkens alias={viewer.alias} {...props} />
          )}
          icon={IconReceivedHenkens}
          text={LL.HeaderNav.Accordion.ReceivedHenkens()}
        />
        <AccordionItem
          className={clsx(['col-span-1'])}
          link={(props) => (
            <LinkUserPostsAnswers alias={viewer.alias} {...props} />
          )}
          icon={IconPostAnswers}
          text={LL.HeaderNav.Accordion.PostsAnswers()}
        />
        <AccordionItem
          className={clsx(['col-span-1'])}
          link={(props) => (
            <LinkUserReceivedAnswers alias={viewer.alias} {...props} />
          )}
          icon={IconReceivedAnswers}
          text={LL.HeaderNav.Accordion.ReceivedAnswers()}
        />
      </div>
      <AccordionItem
        className={clsx(['border-t', ['border-gray-200']])}
        link={(props) => <LinkSettings {...props} />}
        icon={IconSettings}
        text={LL.HeaderNav.Accordion.Settings()}
      />
      <AccordionItem
        className={clsx(['border-t', ['border-gray-200']])}
        link={(props) => <LinkSettings {...props} />}
        icon={IconSignOut}
        text={LL.HeaderNav.Accordion.SignOut()}
      />
    </div>
  );
};
