import { Entity, EntityModel, EntityResource } from '@app/entity';
import { HttpError } from '@app/shared/httperror';

export class EntityService {

  public async getEntities(): Promise<Entity[]> {
    try {
      const entities = new Array<EntityResource>();
      const ents = await EntityModel.find({}, 'name');
      for (const ent of ents) {
        entities.push(new EntityResource({ id: ent.id, name: ent.name }));
      }
      return entities;
    } catch (err) {
      throw new HttpError(500, err);
    }
  }

  public async createEntity(ent: Entity): Promise<Entity> {
    try {
      const entity = new EntityModel(ent);
      await entity.save();
      return new EntityResource({ id: entity.id, name: entity.name });
    } catch (err) {
      throw new HttpError(500, err);
    }
  }

  public async getEntity(id: string): Promise<Entity> {
    try {
      const entity = await EntityModel.findById(id);
      if (!entity) {
        throw new HttpError(404, 'Entity not found.');
      }
      return new EntityResource({ id: entity.id, name: entity.name });
    } catch (err) {
      throw new HttpError(500, err);
    }
  }

  public async updateEntity(id: string, name: string): Promise<Entity> {
    try {
      const entity = await EntityModel.findById(id);
      if (!entity) {
        throw new HttpError(404, 'Entity not found.');
      }
      entity.name = name;
      entity.save();
      return new EntityResource({ id: entity.id, name: entity.name });
    } catch (err) {
      throw new HttpError(500, err);
    }
  }

  public async deleteEntity(id: string): Promise<Entity> {
    try {
      const entity = await EntityModel.findById(id);
      if (!entity) {
        throw new HttpError(404, 'Entity not found.');
      }
      await entity.remove();
      return new EntityResource({ id: entity.id, name: entity.name });
    } catch (err) {
      throw new HttpError(500, err);
    }
  }
}
