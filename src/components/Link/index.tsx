import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import React from 'react';

type LinkProps<T extends Record<string, unknown> = Record<string, unknown>> =
  & Omit<NextLinkProps, 'href'>
  & T;

export const LinkIndex: React.FC<LinkProps> = ({...props}) => (
  <NextLink href="/" {...props} />
);
export const LinkTos: React.FC<LinkProps> = ({...props}) => (
  <NextLink href="/tos" {...props} />
);
export const LinkPrivacy: React.FC<LinkProps> = ({...props}) => (
  <NextLink href="/privacy" {...props} />
);

export const LinkSettings: React.FC<LinkProps> = ({alias, ...props}) => (
  <NextLink href="/settings" {...props} />
);

export const LinkUser: React.FC<LinkProps<{alias: string;}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}`} {...props} />;
export const LinkUserFollowees: React.FC<LinkProps<{alias: string;}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/followees`} {...props} />;
export const LinkUserFollowers: React.FC<LinkProps<{alias: string;}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/followers`} {...props} />;

export const LinkUserPostsHenkens: React.FC<LinkProps<{alias: string;}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/henkens/post`} {...props} />;
export const LinkUserReceivedHenkens: React.FC<LinkProps<{alias: string;}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/henkens/received`} {...props} />;

export const LinkUserPostsAnswers: React.FC<LinkProps<{alias: string;}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/answers/posts`} {...props} />;
export const LinkUserReceivedAnswers: React.FC<LinkProps<{alias: string;}>> = ({
  alias,
  ...props
}) => <NextLink href={`/users/${alias}/answers/received`} {...props} />;

export const LinkAuthor: React.FC<LinkProps<{id: string;}>> = ({
  id,
  ...props
}) => <NextLink href={`/authors/${id}`} {...props} />;

export const LinkBook: React.FC<LinkProps<{id: string;}>> = (
  {id, ...props},
) => <NextLink href={`/books/${id}`} {...props} />;
export const LinkBookSeries: React.FC<LinkProps<{id: string;}>> = ({
  id,
  ...props
}) => <NextLink href={`/bookseries/${id}`} {...props} />;
