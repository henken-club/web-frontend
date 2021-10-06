import {HenkenPageQuery as PageQueryResult} from './index.page.codegen';

import {serializeUser, serializeHenken} from '~/libs/serializer';

type ResultHenken = Exclude<
  PageQueryResult['findHenken']['henken'],
  null | undefined
>;

export const serializeContent = (
  content: ResultHenken['content'],
):
  | {type: 'Book'; book: {id: string; title: string; cover: string | null}}
  | {type: 'BookSeries'; bookSeries: {id: string; title: string}}
  | {type: 'Author'; author: {id: string; name: string}} => {
  switch (content.__typename) {
    case 'Book':
      return {
        type: 'Book',
        book: {
          id: content.id,
          title: content.title,
          cover: content.cover || null,
        },
      };
    case 'BookSeries':
      return {
        type: 'BookSeries',
        bookSeries: {
          id: content.id,
          title: content.title,
        },
      };
    case 'Author':
      return {
        type: 'Author',
        author: {
          id: content.id,
          name: content.name,
        },
      };
  }
};

export type SerializedProps = {
  henken: {
    id: string;
    comment: string;
    postedBy: {id: string; alias: string; displayName: string; avatar: string};
    postsTo: {id: string; alias: string; displayName: string; avatar: string};
    content: ReturnType<typeof serializeContent>;
  };
};

export const serializer = ({
  findHenken: {henken},
}: PageQueryResult): SerializedProps | null =>
  henken
    ? {
        henken: serializeHenken({
          ...henken,
          postsTo: serializeUser({...henken.postsTo}),
          postedBy: serializeUser({...henken.postedBy}),
          content: serializeContent({...henken.content}),
        }),
      }
    : null;
