export type ErrorObject = {status: 400 | 404 | 500};
export type Serializable = {serialize(): ErrorObject};

export class TransformError extends Error implements Serializable {
  serialize(): ErrorObject {
    return {status: 400};
  }
}
export class BadRequestError extends Error implements Serializable {
  serialize(): ErrorObject {
    return {status: 404};
  }
}
export class ServerSideError extends Error implements Serializable {
  serialize(): ErrorObject {
    return {status: 500};
  }
}

export type ErrorHandling<T> = T | {error: ErrorObject};
