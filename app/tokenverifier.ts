import { Config } from '@app/config';
import { HttpError } from '@app/shared/httperror';
import { UserModel } from '@app/user';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export interface TokenData {
  _id: string;
}

export class TokenVerifier {
  constructor(private secret: string) {
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['x-access-token'] as string;
      if (!token) {
        throw new HttpError(403, 'No token provided.');
      }
      const tokenData = await verify(token, this.secret) as TokenData; // can't read secret for some reason
      const id = tokenData._id;
      const user = await UserModel.findById(id);
      if (!user) {
        throw new HttpError(401, 'Unable to verify token.');
      }
      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }
}
