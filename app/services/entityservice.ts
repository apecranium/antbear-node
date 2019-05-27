import HttpException from '../exceptions/httpexception';
import IEntity from '../interfaces/ientity';
import Entity from '../models/entity';

export default class EntityService {

  public async getEntities() {
    let entities: IEntity[];
    await Entity.find({}, 'name', (err, ents) => {
      if (err) {
        throw new HttpException(500, err);
      } else {
        entities = ents;
      }
    });
    return entities;
  }

  public async createEntity(ent: IEntity) {
    const entity = new Entity(ent);
    await entity.save((err) => {
      if (err) {
        throw new HttpException(500, err);
      }
    });
    return entity;
  }

  public async getEntity(id: string) {
    let entity: IEntity;
    await Entity.findById(id, (err, ent) => {
      if (err) {
        throw new HttpException(500, err);
      } else {
        entity = ent;
      }
    });
    return entity;
  }

  public async updateEntity(id: string, name: string) {
    let entity: IEntity;
    await Entity.findById(id, async (err, ent) => {
      if (err) {
        throw new HttpException(500, err);
      } else {
        ent.name = name;
        entity = ent;
        await ent.save();
      }
    });
    return entity;
  }

  public async deleteEntity(id: string) {
    await Entity.findByIdAndRemove(id, (err, entity) => {
      if (err) {
        throw new HttpException(500, err);
      }
    });
  }
}
