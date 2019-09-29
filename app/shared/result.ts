export class Result<T> {

  public static OK<O>(value: O): Result<O> {
    return new Result<O>(true, value);
  }

  public static Fail<E>(error: E): Result<E> {
    return new Result<E>(false, error);
  }

  public static isError(value: unknown): value is Error {
    return value instanceof Error;
  }

  public constructor(public success: boolean, public value: T) {
  }
}
