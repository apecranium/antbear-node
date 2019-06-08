import { Entity, EntityModel, EntityResource } from '@app/entity';
import { HttpException } from '@app/exceptions/httpexception';

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
      throw new HttpException(500, err);
    }
  }

  public async createEntity(ent: Entity): Promise<Entity> {
    try {
      const entity = new EntityModel(ent);
      return await entity.save();
    } catch (err) {
      throw new HttpException(500, err);
    }
  }

  public async getEntity(id: string): Promise<Entity> {
    try {
      const ent = await EntityModel.findById(id);
      return new EntityResource({ id: ent.id, name: ent.name });
    } catch (err) {
      throw new HttpException(500, err);
    }
  }

  public async updateEntity(id: string, name: string): Promise<Entity> {
    try {
      const entity = await EntityModel.findById(id);
      if (entity) {
        entity.name = name;
        return entity.save();
      } else {
        throw new HttpException(404, `can't find entity ${id}`);
      }
    } catch (err) {
      throw new HttpException(500, err);
    }
  }

  public async deleteEntity(id: string): Promise<Entity> {
    try {
      return await EntityModel.findByIdAndRemove(id);
    } catch (err) {
      throw new HttpException(500, err);
    }
  }
}
