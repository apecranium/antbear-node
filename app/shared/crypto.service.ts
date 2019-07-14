import { Config } from '@app/config';
import { HttpError } from '@app/shared/httperror';
import { UserModel } from '@app/user';
import { compare, hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

export interface TokenData {
  id: string;
  iat: number;
  exp: number;
}

export class CryptoService {
  constructor(private readonly env: Config) {
  }

  public compare = async (s: string, hashedString: string) => {
    return await compare(s, hashedString);
  }

  public hash = async (s: string) => {
    return await hash(s, 10);
  }

  public sign = async (payload: {}) => {
    return await sign(payload, this.env.SECRET_KEY, { expiresIn: this.env.TOKEN_EXPIRY });
  }

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers['x-access-token'] as string;
      if (!token) {
        throw new HttpError(403, 'No token provided.');
      }
      const tokenData = await verify(token, this.env.SECRET_KEY) as TokenData;
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
