import { Router } from 'express';
import { Controller } from '../shared';
import { UserService } from '../user';

export class UserController implements Controller {
  public path = '/users';
  public router = Router();
  public viewAll = 'users';
  public view = 'user';
  private userService = new UserService();

  constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const users = await this.userService.getUsers();
          res.render(this.viewAll, { title: this.viewAll, users });
        } catch (err) {
          next(err);
        }
      })
      /*
      .post(async (req, res, next) => {
        try {
          const userData = { name: req.body.name, credentials: { email: req.body.email, password: req.body.password }};
          const user = await this.userService.createUser(userData);
          res.status(201).json(user);
        } catch (err) {
          next(err);
        }
      }) */;

    this.router.route(`${this.path}/:id`)
      .get(async (req, res, next) => {
        try {
          const user = await this.userService.getUser(req.params.id);
          res.render(this.view, { title: this.view, user });
        } catch (err) {
          next(err);
        }
      })
      /*
      .put(async (req, res, next) => {
        try {
          const user = await this.userService.updateUser({ id: req.params.id, name: req.body.name, credentials: {}});
          res.json(user);
        } catch (err) {
          next(err);
        }
      })
      .delete(async (req, res, next) => {
        try {
          await this.userService.deleteUser(req.params.id);
          res.json({ message: `User ${req.params.id} deleted.` });
        } catch (err) {
          next(err);
        }
      }) */;
  }
}
