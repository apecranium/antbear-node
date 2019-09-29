import { Router } from 'express';
import { AuthenticationService } from '../authentication';
import { Controller, CryptoService } from '../shared';
import { UserService } from '../user';

export class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();
  private cryptoService = new CryptoService();
  private authService: AuthenticationService;
  private userService = new UserService();

  public constructor() {
    this.authService = new AuthenticationService(this.cryptoService);

    this.router.post(`${this.path}/register`, async (req, res, next) => {
      try {
        const userData = { name: req.body.name, credentials: { email: req.body.email, password: req.body.password }};
        const token = await this.authService.registerUser(userData);
        res.json({ authenticated: true, token });
      } catch (error) {
        next(error);
      }
    })

    .post(`${this.path}/login`, async (req, res, next) => {
      try {
        const credentials = { email: req.body.email, password: req.body.password };
        const token = await this.authService.loginUser(credentials);
        res.json({ authenticated: true, token });
      } catch (error) {
        next(error);
      }
    })

    .get(`${this.path}/identify`, this.cryptoService.verify, async (req, res, next) => {
      try {
        const user = await this.userService.getUser(res.locals.tokenData.id);
        const issuedAt = new Date(res.locals.tokenData.iat * 1000).toString();
        const expiresAt = new Date(res.locals.tokenData.exp * 1000).toString();
        res.json({ authenticated: true, user, issuedAt, expiresAt });
      } catch (error) {
        next(error);
      }
    });
  }
}
