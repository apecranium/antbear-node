import { Router } from 'express';
import { Controller } from './shared';

export class IndexController implements Controller {
  public path = '/:var(index)?';
  public router = Router();
  public view = 'index';

  constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        res.render(this.view, { title: 'index' });
      });
  }
}
