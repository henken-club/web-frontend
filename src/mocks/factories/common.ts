import faker from 'faker';

import {AnswerType} from '../codegen';

// common
export const id = faker.datatype.uuid;
export const createdAt = () =>
  faker.date.between('2020-01-01', '2020-12-31').toISOString();
export const updatedAt = createdAt;

export const totalCount = faker.datatype.number;
export const hasNextPage = faker.datatype.boolean;

// Util
export const which = faker.random.arrayElement;
export const repeat = <T>(count: number, generator: () => T): T[] =>
  [...new Array(count)].map((_, i) => generator());
export const between = (min: number, max: number) =>
  min + faker.datatype.number(max - min);

// User
export const alias = faker.lorem.word;
export const displayName = faker.name.firstName;
export const avatar = () =>
  which([
    '/.mock/avatar_1.png',
    '/.mock/avatar_2.png',
    '/.mock/avatar_3.png',
    '/.mock/avatar_4.png',
    '/.mock/avatar_5.png',
    '/.mock/avatar_6.png',
    '/.mock/avatar_7.png',
    '/.mock/avatar_8.png',
    '/.mock/avatar_9.png',
    '/.mock/avatar_10.png',
    '/.mock/avatar_11.png',
    '/.mock/avatar_12.png',
  ]);

// Henken, Answer
export const title = faker.lorem.words;
export const comment = faker.lorem.words;

// Answer
export const answerType = () => which([AnswerType.Right, AnswerType.Wrong]);

// Recommendation
export const score = faker.datatype.number;

// Book
export const bookCover = () =>
  which([
    '/.mock/bookcover_1.jpg',
    '/.mock/bookcover_2.jpg',
    '/.mock/bookcover_3.jpg',
    '/.mock/bookcover_4.jpg',
    '/.mock/bookcover_5.jpg',
    '/.mock/bookcover_6.jpg',
    '/.mock/bookcover_7.jpg',
    '/.mock/bookcover_8.jpg',
  ]);

// Author
export const authorName = () => faker.name.findName();
