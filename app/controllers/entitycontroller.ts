import { Router } from 'express';
import IController from '../interfaces/icontroller';
import EntityService from '../services/entityservice';

export default class EntityController implements IController {
  public path = '/entities';
  public router = Router();
  private entityService = new EntityService();

  constructor() {
    this.router.get(this.path, async (req, res, next) => {
      try {
        const entities = await this.entityService.getEntities();
        res.json(entities);
      } catch (err) {
        next(err);
      }
    })

    .post(this.path, async (req, res, next) => {
      try {
        const entity = await this.entityService.createEntity(req.body);
        res.status(201).json(entity);
      } catch (err) {
        next(err);
      }
    })

    .get(`${this.path}/:id`, async (req, res, next) => {
      try {
        const entity = await this.entityService.getEntity(req.params.id);
        res.json(entity);
      } catch (err) {
        next(err);
      }
    })

    .put(`${this.path}/:id`, async (req, res, next) => {
      try {
        const entity = await this.entityService.updateEntity(req.params.id, req.body.name);
        res.json(entity);
      } catch (err) {
        next(err);
      }
    })

    .delete(`${this.path}/:id`, async (req, res, next) => {
      try {
        await this.entityService.deleteEntity(req.params.id);
        res.json({ message: `entity ${req.params.id} deleted` });
      } catch (err) {
        next(err);
      }
    });
  }
}
