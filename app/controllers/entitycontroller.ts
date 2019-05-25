import { Router } from 'express';
import IController from '../interfaces/icontroller';
import Entity from '../models/entity';

export default class EntityController implements IController {
  public path = '/entities';
  public router = Router();

  constructor() {
    this.router.get(this.path, (req, res) => {
      Entity.find((err, entities) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        } else {
          res.json(entities);
        }
      });
    })
    .post(this.path, (req, res) => {
      const entity = new Entity(req.body);
      entity.save().then(() => {
        res.status(201).json({ message: `added entity ${entity.name}` });
      })
      .catch(err => {
        res.status(500).json({ error: `${err}` });
      });
    })
    .get(`${this.path}/:id`, (req, res) => {
      const id = req.params.id;
      Entity.findById(id, (err, entity) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        } else {
          res.json(entity);
        }
      });
    })
    .put(`${this.path}/:id`, (req, res) => {
      const id = req.params.id;
      Entity.findById(id, (err, entity) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        } else {
          entity.name = req.body.name;
          entity.save().then(ent => {
            res.json(ent);
          });
        }
      });
    })
    .delete(`${this.path}/:id`, (req, res) => {
      const id = req.params.id;
      Entity.findByIdAndRemove(id, (err, entity) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        } else {
          res.json({ message: 'entity deleted' });
        }
      });
    });
  }
}
