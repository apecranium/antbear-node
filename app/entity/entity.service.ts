import { Entity, EntityData, EntityModel } from '../entity';
import { HttpError } from '../shared';

export class EntityService {

  public async getEntities(): Promise<Entity[]> {
    const entities = new Array<EntityData>();
    const ents = await EntityModel.find();
    for (const ent of ents) {
      entities.push(new EntityData(ent));
    }
    return entities;
  }

  public async createEntity(ent: Entity): Promise<Entity> {
    const entity = new EntityModel(ent);
    await entity.save();
    return new EntityData(entity);
  }

  public async getEntity(id: string): Promise<Entity> {
    const entity = await EntityModel.findById(id);
    if (!entity) {
      throw new HttpError(404, 'Entity not found.');
    }
    return new EntityData(entity);
  }

  public async updateEntity(ent: Entity): Promise<Entity> {
    const entity = await EntityModel.findById(ent.id);
    if (!entity) {
      throw new HttpError(404, 'Entity not found.');
    }
    entity.name = ent.name;
    await entity.save();
    return new EntityData(entity);
  }

  public async deleteEntity(id: string): Promise<Entity> {
    const entity = await EntityModel.findById(id);
    if (!entity) {
      throw new HttpError(404, 'Entity not found.');
    }
    await entity.remove();
    return new EntityData(entity);
  }
}
