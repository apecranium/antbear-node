import { Router } from 'express';
import { EntityDto, EntityService } from '../entity';
import { Controller, Result } from '../shared';

export class EntityApiController implements Controller {
  public path = '/entities';
  public router = Router();
  private entityService = new EntityService();

  public constructor() {
    this.router.route(this.path)
      .get(async (req, res, next) => {
        try {
          const entities = await this.entityService.getEntities(1, 100);
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
        const entDto = new EntityDto({ id: req.params.id });
        const entityResult = await this.entityService.getEntity(entDto.id);
        if (Result.isError(entityResult.value)) {
          next(entityResult.value);
        } else {
          res.json(entityResult.value);
        }
      })
      .put(async (req, res, next) => {
        const entDto = new EntityDto({ id: req.params.id, name: req.body.name });
        const entityResult = await this.entityService.updateEntity(entDto);
        if (Result.isError(entityResult.value)) {
          next(entityResult.value);
        } else {
          res.json(entityResult.value);
        }
      })
      .delete(async (req, res, next) => {
        const entDto = new EntityDto({ id: req.params.id });
        const entityResult = await this.entityService.deleteEntity(entDto.id);
        if (Result.isError(entityResult.value)) {
          next(entityResult.value);
        } else {
          res.json({ message: `Entity ${entDto.id} deleted.` });
        }
      });
  }
}
