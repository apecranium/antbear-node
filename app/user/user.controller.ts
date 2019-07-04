import { Config } from '@app/config';
import { Controller } from '@app/shared/controller';
import { TokenVerifier } from '@app/tokenverifier';
import { UserData, UserModel, UserService } from '@app/user';
import { Router } from 'express';

export class UserController implements Controller {
  public path = '/user';
  public router = Router();
  public tokenVerifier: TokenVerifier;
  private userService: UserService;

  constructor(env: Config) {
    this.userService = new UserService(env);
    this.tokenVerifier = new TokenVerifier(env.SECRET_KEY);

    this.router.post(`${this.path}/register`, async (req, res, next) => {
      try {
        const userdata = new UserData(req.body.email, req.body.name, req.body.password);
        const token = await this.userService.registerUser(userdata);
        res.json({ authenticated: true, token });
      } catch (err) {
        next(err);
      }
    })

    .post(`${this.path}/login`, async (req, res, next) => {
      try {
        const userdata = new UserData(req.body.email, req.body.name, req.body.password);
        const token = await this.userService.loginUser(userdata);
        res.json({ authenticated: true, token });
      } catch (err) {
        next(err);
      }
    })

    .get(`${this.path}/identify`, this.tokenVerifier.verify, async (req, res, next) => {
      try {
        const user = await this.userService.getUser(res.locals.tokenData.id);
        const expiry = new Date(res.locals.tokenData.exp * 1000).toTimeString();
        res.status(200).json({ authenticated: true, name: user.name, expiresAt: expiry });
      } catch (err) {
        next(err);
      }
    });
  }
}
