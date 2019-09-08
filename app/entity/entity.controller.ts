import { Router } from 'express';
import { EntityDto, EntityService } from '../entity';
import { Controller } from '../shared';

export class EntityController implements Controller {
  public path = '/entities';
  public router = Router();
  public viewAll = 'entities';
  public view = 'entity';
  private entityService = new EntityService();

  constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const page = parseInt(req.query.page, 10) || 1;
          const limit = parseInt(req.query.limit, 10) || 10;
          const entities = await this.entityService.getEntities(page, limit);
          res.render(this.viewAll, { title: this.viewAll, entities, page });
        } catch (error) {
          next(error);
        }
      });

    this.router.route(`${this.path}/create`)
      .get(async (req, res, next) => {
        res.render('create_entity', { title: 'Create Entity' });
      })
      .post(async (req, res, next) => {
        try {
          const entDto = new EntityDto({ name: req.body.name });
          const entity = await this.entityService.createEntity(entDto);
          res.redirect(`${this.path}/${entity.id}`);
        } catch (error) {
          next(error);
        }
      });

    this.router.route(`${this.path}/:id`)
      .get(async (req, res, next) => {
        try {
          const entity = await this.entityService.getEntity(req.params.id);
          res.render(this.view, { title: this.view, entity });
        } catch (error) {
          next(error);
        }
      });
  }
}
