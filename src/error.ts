export interface Unwrappable<T> {
    unwrap(): T | never
}

export interface Result<T, U extends Error> extends Unwrappable<T> {
    unwrap(): T | never,
    hasError(): boolean,
    getError(): U
}

class OkResult<T> implements Result<T, Error> {
    constructor(private readonly value: T) {}

    unwrap(): T {
        return this.value;
    }

    hasError(): boolean {
        return false;
    }

    getError(): Error {
        return undefined;
    }
}

class ErrorResult<E extends Error> implements Result<any, E> {
    constructor(private readonly error: E) {}

    unwrap(): never {
        throw this.error;
    }

    hasError(): boolean {
        return true;
    }

    getError(): E {
        return this.error;
    }

}

export function Ok<T>(value: T): Result<T, Error> {
    return new OkResult(value);
}

export function Err<E extends Error>(error: E): Result<any, E> {
    return new ErrorResult(error);
}