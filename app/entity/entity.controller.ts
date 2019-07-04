import { EntityData, EntityService } from '@app/entity';
import { Controller } from '@app/shared/controller';
import { Router } from 'express';

export class EntityController implements Controller {
  public path = '/entities';
  public router = Router();
  private entityService = new EntityService();

  constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const entities = await this.entityService.getEntities();
          res.json(entities);
        } catch (err) {
          next(err);
        }
      })
      .post(async (req, res, next) => {
        try {
          const entity = await this.entityService.createEntity(new EntityData(req.body.id, req.body.name));
          res.status(201).json(entity);
        } catch (err) {
          next(err);
        }
      });

    this.router.route(`${this.path}/:id`)
      .get(async (req, res, next) => {
        try {
          const entity = await this.entityService.getEntity(req.params.id);
          res.json(entity);
        } catch (err) {
          next(err);
        }
      })
      .put(async (req, res, next) => {
        try {
          const entity = await this.entityService.updateEntity(new EntityData(req.params.id, req.body.name));
          res.json(entity);
        } catch (err) {
          next(err);
        }
      })
      .delete(async (req, res, next) => {
        try {
          await this.entityService.deleteEntity(req.params.id);
          res.json({ message: `Entity ${req.params.id} deleted.` });
        } catch (err) {
          next(err);
        }
      });
  }
}
