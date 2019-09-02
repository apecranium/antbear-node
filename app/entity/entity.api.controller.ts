import { EntityService } from '../entity';
import { Controller } from '../shared';
import { Router } from 'express';

export class EntityApiController implements Controller {
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
          const entity = await this.entityService.createEntity({ id: req.body.id, name: req.body.name });
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
          const entity = await this.entityService.updateEntity({ id: req.params.id, name: req.body.name });
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
