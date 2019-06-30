import { Controller } from '@app/shared/controller';
import { HttpError } from '@app/shared/httperror';
import { UserModel, UserService } from '@app/user';
import { Router } from 'express';

export class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.router.post(`${this.path}/register`, async (req, res, next) => {
      try {
        throw new HttpError(501, 'Not implemented yet.');
      } catch (err) {
        next(err);
      }
    })

    .post(`${this.path}/login`, async (req, res, next) => {
      try {
        throw new HttpError(501, 'Not implemented yet.');
      } catch (err) {
        next(err);
      }
    });
  }
}
