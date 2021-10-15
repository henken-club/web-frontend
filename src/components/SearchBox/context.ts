import React from 'react';

export type AuthorType = {
  id: string;
  name: string;
};

export type BookType = {
  id: string;
  title: string;
  authors: {id: string; name: string;}[];
};

export type BookSeriesType = {
  id: string;
  title: string;
};

export type Suggestion =
  | {type: 'author'; content: AuthorType;}
  | {type: 'book'; content: BookType;}
  | {type: 'bookSeries'; content: BookSeriesType;};

type ContextType =
  & {
    updateQuery(query: string): void;
    focus: boolean;
    updateFocus(focus: boolean): void;
  }
  & ({
    // 初期状態
    query: '';
    fetching: false;
    suggestions: undefined;
  } | {
    // 取得中
    query: string;
    fetching: true;
    suggestions: {
      nodes: [] | Suggestion[];
    };
  } | {
    // 取得済み
    query: string;
    fetching: false;
    suggestions: {
      nodes: [] | Suggestion[];
    };
  });

export const SearchBoxContext = React.createContext<ContextType>({
  updateQuery() {},
  focus: false,
  updateFocus() {},
  query: '',
  fetching: false,
  suggestions: {nodes: []},
});
