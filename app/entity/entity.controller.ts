import { Router } from 'express';
import { EntityDto, EntityRepository, EntityViewModel } from '../entity';
import { Controller, Result } from '../shared';

export class EntityController implements Controller {
  public path = '/entities';
  public router = Router();
  private entityRepo = new EntityRepository();

  public constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const page = Number(req.query.page) || 1;
          const limit = Number(req.query.limit) || 10;
          const entitiesResult = await this.entityRepo.getAll(page, limit);
          const count = await this.entityRepo.count();
          const entityViewModel = new EntityViewModel(page, limit, count, entitiesResult.value);
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
          const entity = await this.entityRepo.create(entDto);
          res.redirect(`${this.path}/${entity.value.id}`);
        } catch (error) {
          next(error);
        }
      });

    this.router.route(`${this.path}/:id`)
      .get(async (req, res, next) => {
        const entDto = new EntityDto({ id: req.params.id });
        const entityResult = await this.entityRepo.findById(entDto.id);
        if (Result.isError(entityResult.value)) {
          next(entityResult.value);
        } else {
          res.render('entity', { title: 'entity', entity: entityResult.value });
        }
      });
  }
}
