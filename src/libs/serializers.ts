export type ContentBook<T extends {id: string}> = {
  type: 'Book';
  book: T;
};

export type ContentBookSeries<T extends {id: string}> = {
  type: 'BookSeries';
  bookSeries: T;
};

export type SerializeContent<
  TInput,
  TBook extends {id: string},
  TBookSeries extends {id: string},
> = (input: TInput) => ContentBook<TBook> | ContentBookSeries<TBookSeries>;

export const serializeUser = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'User'} & T) => ({...props});

export const serializeHenken = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'Henken'} & T) => ({...props});
