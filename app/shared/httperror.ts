export class HttpError extends Error {
  public constructor(public status: number, public message: string) {
    super(message);
  }
}
