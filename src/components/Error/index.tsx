import React from 'react';
import NextError from 'next/error';

export type ErrorObject = {status: 400 | 500};
export type SerializableError = {serialize(): ErrorObject};

export class BadRequestError extends Error implements SerializableError {
  serialize(): ErrorObject {
    return {status: 400};
  }
}
export class ServerSideError extends Error implements SerializableError {
  serialize(): ErrorObject {
    return {status: 500};
  }
}

export type ThrowableStaticProps<T> = T | {error: ErrorObject};

export const ErrorTemplate: React.VFC<{error: ErrorObject}> = ({error}) => {
  return (
    <>
      <NextError statusCode={error.status} />
    </>
  );
};
