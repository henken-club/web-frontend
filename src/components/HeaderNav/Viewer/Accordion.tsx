import React from 'react';
import clsx from 'clsx';

import {Image} from '~/components/Image';
import {useTranslation} from '~/i18n/useTranslation';
import {
  LinkUser,
  LinkUserPostsAnswers,
  LinkUserPostsHenkens,
  LinkUserReceivedAnswers,
  LinkUserReceivedHenkens,
} from '~/components/Link';
import {
  IconType,
  IconPostHenkens,
  IconReceivedHenkens,
  IconSettings,
  IconSignOut,
  IconReceivedAnswers,
  IconPostAnswers,
} from '~/components/Icon';

export const AccordionItem: React.VFC<{
  className?: string;
  icon: IconType;
  text: string;
}> = ({className, icon: Icon, text}) => (
  <div
    className={clsx(
      className,
      ['col-span-1'],
      [['px-3'], ['py-3']],
      [['flex'], ['items-center']],
      ['bg-white', 'hover:bg-blue-100'],
    )}
  >
    <Icon className={clsx(['text-sm'])} />
    <span className={clsx(['ml-2'], ['text-xs'], ['whitespace-nowrap'])}>
      {text}
    </span>
  </div>
);

export type AccordionProps = {
  className?: string;
  viewer: {id: string; alias: string; displayName: string; avatar: string};
};
export const Accordion: React.VFC<AccordionProps> = ({className, viewer}) => {
  const {LL} = useTranslation();
  return (
    <nav
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
        <div
          className={clsx(
            [['px-4'], ['py-2']],
            [['flex'], ['items-center']],
            ['bg-white', 'hover:bg-blue-100'],
          )}
        >
          <div className={clsx(['w-10'], ['h-10'])}>
            <Image
              className={clsx(['rounded-full'])}
              src={viewer.avatar}
              alt={viewer.alias}
              width={64}
              height={64}
            />
          </div>
          <div className={clsx(['ml-4'], [['flex'], ['flex-col']])}>
            <span className={clsx(['font-bold'], ['text-sm'])}>
              {viewer.displayName}
            </span>
            <span className={clsx(['text-sm'])}>{viewer.alias}</span>
          </div>
        </div>
      </LinkUser>
      <div
        className={clsx(
          [['grid'], ['grid-cols-2']],
          ['border-t', ['border-gray-200']],
        )}
      >
        <LinkUserPostsHenkens alias={viewer.alias}>
          <AccordionItem
            icon={IconPostHenkens}
            text={LL.HeaderNav.PostsHenkens()}
          />
        </LinkUserPostsHenkens>
        <LinkUserReceivedHenkens alias={viewer.alias}>
          <AccordionItem
            icon={IconReceivedHenkens}
            text={LL.HeaderNav.ReceivedHenkens()}
          />
        </LinkUserReceivedHenkens>
        <LinkUserPostsAnswers alias={viewer.alias}>
          <AccordionItem
            icon={IconPostAnswers}
            text={LL.HeaderNav.PostsAnswers()}
          />
        </LinkUserPostsAnswers>
        <LinkUserReceivedAnswers alias={viewer.alias}>
          <AccordionItem
            icon={IconReceivedAnswers}
            text={LL.HeaderNav.ReceivedAnswers()}
          />
        </LinkUserReceivedAnswers>
      </div>
      <AccordionItem
        className={clsx(['border-t', ['border-gray-200']])}
        icon={IconSettings}
        text={LL.HeaderNav.Settings()}
      />
      <AccordionItem
        className={clsx(['border-t', ['border-gray-200']])}
        icon={IconSignOut}
        text={LL.HeaderNav.SignOut()}
      />
    </nav>
  );
};
