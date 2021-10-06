import {AnswerType as AnswerTypeEnum} from './codegen';

export type ContentBook<T extends {id: string}> = {
  type: 'Book';
  book: T;
};

export type ContentBookSeries<T extends {id: string}> = {
  type: 'BookSeries';
  bookSeries: T;
};

export type ContentAuthor<T extends {id: string}> = {
  type: 'Author';
  author: T;
};

export type SerializeContent<
  TInput,
  TContentType extends Record<
    'book' | 'bookSeries' | 'author',
    Record<string, unknown>
  >,
> = (
  input: TInput,
) =>
  | ContentBook<{id: string} & TContentType['book']>
  | ContentBookSeries<{id: string} & TContentType['bookSeries']>
  | ContentAuthor<{id: string} & TContentType['author']>;

export const serializeUser = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'User'} & T) => ({...props});

export const serializeHenken = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'Henken'} & T) => ({...props});

export const serializeAnswer = <T extends Record<string, unknown>>({
  __typename,
  ...props
}: {__typename: 'Answer'} & T) => ({...props});

export type AnswerType = 'right' | 'wrong';
export const serializeAnswerType = (type: AnswerTypeEnum): AnswerType => {
  switch (type) {
    case AnswerTypeEnum.Right:
      return 'right';
    case AnswerTypeEnum.Wrong:
      return 'wrong';
  }
};
