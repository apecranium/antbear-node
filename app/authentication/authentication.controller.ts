import { AuthenticationData, AuthenticationService } from '@app/authentication';
import { Config } from '@app/config';
import { Controller } from '@app/shared/controller';
import { TokenVerifier } from '@app/shared/tokenverifier';
import { UserService } from '@app/user';
import { Router } from 'express';

export class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  public tokenVerifier: TokenVerifier;
  private authService: AuthenticationService;
  private userService = new UserService();

  constructor(env: Config) {
    this.authService = new AuthenticationService(env);
    this.tokenVerifier = new TokenVerifier(env.SECRET_KEY);

    this.router.post(`${this.path}/register`, async (req, res, next) => {
      try {
        const authData = new AuthenticationData(req.body.email, req.body.password);
        const token = await this.authService.registerUser(authData);
        res.json({ authenticated: true, token });
      } catch (err) {
        next(err);
      }
    })

    .post(`${this.path}/login`, async (req, res, next) => {
      try {
        const userData = new AuthenticationData(req.body.email, req.body.password);
        const token = await this.authService.loginUser(userData);
        res.json({ authenticated: true, token });
      } catch (err) {
        next(err);
      }
    })

    .get(`${this.path}/identify`, this.tokenVerifier.verify, async (req, res, next) => {
      try {
        const user = await this.userService.getUser(res.locals.tokenData.id);
        const issuedAt = new Date(res.locals.tokenData.iat * 1000).toString();
        const expiresAt = new Date(res.locals.tokenData.exp * 1000).toString();
        res.status(200).json({ authenticated: true, user, issuedAt, expiresAt });
      } catch (err) {
        next(err);
      }
    });
  }
}
