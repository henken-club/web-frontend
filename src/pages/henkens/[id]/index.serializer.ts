import {HenkenPageQuery as PageQueryResult} from './index.page.codegen';

import {
  serializeUser,
  SerializeContent,
  serializeHenken,
} from '~/libs/serializers';

type ResultHenken = Exclude<
  PageQueryResult['findHenken']['henken'],
  null | undefined
>;

export const serializeContent: SerializeContent<
  ResultHenken['content'],
  {id: string; title: string; cover: string | null},
  {id: string; title: string}
> = (content) => {
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
