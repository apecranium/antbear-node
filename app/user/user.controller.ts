import { Router } from 'express';
import { Controller } from '../shared';
import { UserService } from '../user';

export class UserController implements Controller {
  public path = '/users';
  public router = Router();
  public viewAll = 'users';
  public view = 'user';
  private userService = new UserService();

  public constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const users = await this.userService.getUsers();
          res.render('users', { title: 'users', users });
        } catch (error) {
          next(error);
        }
      });

    this.router.route(`${this.path}/:id`)
      .get(async (req, res, next) => {
        try {
          const user = await this.userService.getUser(req.params.id);
          res.render('user', { title: 'user', user });
        } catch (error) {
          next(error);
        }
      });
  }
}
