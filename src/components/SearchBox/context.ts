import React from 'react';

export type AuthorType = {
  id: string;
  name: string;
};

export type BookType = {
  id: string;
  title: string;
  authors: {id: string; name: string}[];
};

export type BookSeriesType = {
  id: string;
  title: string;
};

export type Suggestion =
  | {type: 'author'; content: AuthorType}
  | {type: 'book'; content: BookType}
  | {type: 'bookSeries'; content: BookSeriesType};

export const SearchBoxContext = React.createContext<
  // 初期状態
  | {
      fetching: false;
      suggestions: undefined;
    }
  // 取得中
  | {
      fetching: true;
      suggestions: [] | Suggestion[];
    }
  // 取得済み
  | {
      fetching: false;
      suggestions: [] | Suggestion[];
    }
>({
  fetching: false,
  suggestions: undefined,
});
