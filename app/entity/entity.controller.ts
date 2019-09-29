import { Router } from 'express';
import { EntityDto, EntityService, EntityViewModel } from '../entity';
import { Controller, Result } from '../shared';

export class EntityController implements Controller {
  public path = '/entities';
  public router = Router();
  private entityService = new EntityService();

  public constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const page = Number(req.query.page) || 1;
          const limit = Number(req.query.limit) || 10;
          const entities = await this.entityService.getEntities(page, limit);
          const count = await this.entityService.countEntities();
          const entityViewModel = new EntityViewModel(page, limit, count, entities);
          res.render('entities', entityViewModel);
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
        const entDto = new EntityDto({ id: req.params.id });
        const entityResult = await this.entityService.getEntity(entDto.id);
        if (Result.isError(entityResult.value)) {
          next(entityResult.value);
        } else {
          res.render('entity', { title: 'entity', entity: entityResult.value });
        }
      });
  }
}
