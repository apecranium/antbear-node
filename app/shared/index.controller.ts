import { Router } from 'express';
import { Controller } from './controller';

export class IndexController implements Controller {
  public path = '/:var(index)?';
  public router = Router();

  public constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        res.render('index', { title: 'index' });
      });
  }
}
