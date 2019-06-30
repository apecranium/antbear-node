import { Config } from '@app/config';
import { Controller } from '@app/shared/controller';
import { HttpError } from '@app/shared/httperror';
import { UserModel, UserService } from '@app/user';
import { Router } from 'express';

export class UserController implements Controller {
  public path = '/user';
  public router: Router;
  private userService: UserService;

  constructor(env: Config) {
    this.router = Router();
    this.userService = new UserService(env);

    this.router.post(`${this.path}/register`, async (req, res, next) => {
      try {
        const token = await this.userService.registerUser(req.body);
        res.json({ authenticated: true, token });
      } catch (err) {
        next(err);
      }
    })

    .post(`${this.path}/login`, async (req, res, next) => {
      try {
        const token = await this.userService.loginUser(req.body);
        res.json({ authenticated: true, token });
      } catch (err) {
        next(err);
      }
    });
  }
}
