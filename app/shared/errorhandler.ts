import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../shared';

export class ErrorHandler {
  public handle(error: HttpError, req: Request, res: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Sorry, something went wrong.';
    console.log(error.message, error.stack);
    res.status(status).json({ status, message });
  }
}
