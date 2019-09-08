import { Router } from 'express';
import { EntityDto, EntityService } from '../entity';
import { Controller } from '../shared';

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
        } catch (error) {
          next(error);
        }
      })
      .post(async (req, res, next) => {
        try {
          const entDto = new EntityDto({ name: req.body.name });
          const entity = await this.entityService.createEntity(entDto);
          res.status(201).json(entity);
        } catch (error) {
          next(error);
        }
      });

    this.router.route(`${this.path}/:id`)
      .get(async (req, res, next) => {
        try {
          const entDto = new EntityDto({ id: req.params.id });
          const entity = await this.entityService.getEntity(entDto.id!);
          res.json(entity);
        } catch (error) {
          next(error);
        }
      })
      .put(async (req, res, next) => {
        try {
          const entDto = new EntityDto({ id: req.params.id, name: req.body.name });
          const entity = await this.entityService.updateEntity(entDto);
          res.json(entity);
        } catch (error) {
          next(error);
        }
      })
      .delete(async (req, res, next) => {
        try {
          const entDto = new EntityDto({ id: req.params.id });
          await this.entityService.deleteEntity(entDto.id!);
          res.json({ message: `Entity ${entDto.id} deleted.` });
        } catch (error) {
          next(error);
        }
      });
  }
}
