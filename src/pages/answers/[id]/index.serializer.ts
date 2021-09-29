import {AnswerPageQuery as PageQueryResult} from './index.page.codegen';

import {serializeAnswer} from '~/libs/serializer';

type ResultHenken = Exclude<
  PageQueryResult['findAnswer']['answer'],
  null | undefined
>;

export type SerializedProps = {
  answer: {
    id: string;
  };
};

export const serializer = ({
  findAnswer: {answer},
}: PageQueryResult): SerializedProps | null =>
  answer ? {answer: serializeAnswer({...answer})} : null;
