import React from 'react';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';

type LinkProps<T extends Record<string, unknown> = Record<string, unknown>> =
  Omit<NextLinkProps, 'href'> & T;

export const LinkIndex: React.FC<LinkProps> = ({...props}) => (
  <NextLink href="/" {...props} />
);

export const LinkSettings: React.FC<LinkProps> = ({alias, ...props}) => (
  <NextLink href="/settings" {...props} />
);

export const LinkUser: React.FC<LinkProps<{alias: string}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}`} {...props} />;

export const LinkUserPostsHenkens: React.FC<LinkProps<{alias: string}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/henkens/post`} {...props} />;
export const LinkUserReceivedHenkens: React.FC<LinkProps<{alias: string}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/henkens/received`} {...props} />;

export const LinkUserPostsAnswers: React.FC<LinkProps<{alias: string}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/answers/posts`} {...props} />;
export const LinkUserReceivedAnswers: React.FC<LinkProps<{alias: string}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/answers/received`} {...props} />;
