import faker from 'faker';

import {AnswerType} from '../codegen';

export const id = faker.datatype.uuid;
export const alias = faker.lorem.word;
export const displayName = faker.name.firstName;
export const avatar = faker.image.avatar;

export const which = faker.random.arrayElement;

export const createdAt = () =>
  faker.date.between('2020-01-01', '2020-12-31').toISOString();
export const updatedAt = createdAt;

export const answerType = () => which([AnswerType.Right, AnswerType.Wrong]);

export const title = faker.lorem.words;
export const comment = faker.lorem.words;

export const bookCover = () => which([null, faker.image.abstract()]);

export const repeat = <T>(count: number, generator: () => T): T[] =>
  [...new Array(count)].map((_, i) => generator());
