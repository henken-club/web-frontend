import {HenkenPageQuery as PageQueryResult} from './index.page.codegen';

type ResultHenken = Exclude<
  PageQueryResult['findHenken']['henken'],
  null | undefined
>;

export type TransformedProps = {
  henken: {
    id: string;
  };
};

export const transformer = ({
  findHenken: {henken: user},
}: PageQueryResult): TransformedProps | null =>
  user ? {henken: {id: user.id}} : null;
