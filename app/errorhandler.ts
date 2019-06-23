import { HttpError } from '@app/shared/httperror';
import { NextFunction, Request, Response } from 'express';

export function ErrorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Sorry, something went wrong';
  res
    .status(status)
    .send({
      message,
      status
    });
}
