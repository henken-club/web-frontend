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

// User
export const alias = faker.lorem.word;
export const displayName = faker.name.firstName;
export const avatar = faker.image.avatar;

// Henken, Answer
export const title = faker.lorem.words;
export const comment = faker.lorem.words;

// Answer
export const answerType = () => which([AnswerType.Right, AnswerType.Wrong]);

// Recommendation
export const score = faker.datatype.number;

// Book
export const bookCover = () => which([null, faker.image.abstract()]);
