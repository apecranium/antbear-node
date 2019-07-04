import { Config } from '@app/config';
import { HttpError } from '@app/shared/httperror';
import { UserModel } from '@app/user';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export interface TokenData {
  id: string;
  exp: number;
}

export class TokenVerifier {
  constructor(private readonly secret: string) {
  }

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['x-access-token'] as string;
      if (!token) {
        throw new HttpError(403, 'No token provided.');
      }
      const tokenData = await verify(token, this.secret) as TokenData;
      const user = await UserModel.findById(tokenData.id);
      if (!user) {
        throw new HttpError(401, 'Unable to verify token.');
      }
      res.locals.tokenData = tokenData;
      next();
    } catch (err) {
      next(err);
    }
  }
}
