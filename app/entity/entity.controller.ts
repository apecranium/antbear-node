import { Router } from 'express';
import { EntityDto, EntityService } from '../entity';
import { Controller } from '../shared';

export class EntityController implements Controller {
  public path = '/entities';
  public router = Router();
  private entityService = new EntityService();

  constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const page = parseInt(req.query.page, 10) || 1;
          const limit = parseInt(req.query.limit, 10) || 10;
          const entities = await this.entityService.getEntities(page, limit);
          res.render('entities', { title: 'entities', entities, page });
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
          const entDto = new EntityDto({ id: req.params.id });
          const entity = await this.entityService.getEntity(entDto.id);
          res.render('entity', { title: 'entity', entity });
        } catch (error) {
          next(error);
        }
      });
  }
}
