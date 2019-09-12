import { Entity, EntityModel } from '../entity';
import { HttpError } from '../shared';

export class EntityService {

  public async getEntities(page = 1, limit = 10): Promise<Entity[]> {
    const entities = new Array<Entity>();
    const ents = await EntityModel.find({}, null, { skip: (limit * (page - 1)), limit });
    for (const ent of ents) {
      entities.push(ent);
    }
    return entities;
  }

  public async createEntity(ent: Partial<Entity>): Promise<Entity> {
    const entity = new EntityModel(ent);
    await entity.save();
    return entity;
  }

  public async getEntity(id: string): Promise<Entity> {
    const entity = await EntityModel.findById(id);
    if (!entity) {
      throw new HttpError(404, 'Entity not found.');
    }
    return entity;
  }

  public async updateEntity(ent: Partial<Entity>): Promise<Entity> {
    const entity = await EntityModel.findById(ent.id);
    if (!entity) {
      throw new HttpError(404, 'Entity not found.');
    }
    entity.name = ent.name ? ent.name : entity.name;
    await entity.save();
    return entity;
  }

  public async deleteEntity(id: string): Promise<Entity> {
    const entity = await EntityModel.findById(id);
    if (!entity) {
      throw new HttpError(404, 'Entity not found.');
    }
    await entity.remove();
    return entity;
  }
}
