import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../shared';

export class ErrorHandler {
  constructor(private isWeb: boolean) {
  }

  public handle = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Sorry, something went wrong.';
    console.error(error.message, error.stack);
    if (this.isWeb) {
      res.render('error', { title: 'error', error: { status, message } });
    } else {
      res.status(status).json({ status, message });
    }
  }
}
