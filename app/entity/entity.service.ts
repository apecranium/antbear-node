import { Entity, EntityModel } from '../entity';
import { HttpError } from '../shared';
import { Result } from '../shared/result';

export class EntityService {

  public async getEntities(page = 1, limit = 10): Promise<Entity[]> {
    const entities = new Array<Entity>();
    const ents = await EntityModel.find({}, null, { skip: (limit * (page - 1)), limit });
    for (const ent of ents) {
      entities.push(ent);
    }
    return entities;
  }

  public async countEntities(filter?: string) {
    return await EntityModel.countDocuments({ filter });
  }

  public async createEntity(ent: Partial<Entity>): Promise<Entity> {
    const entity = new EntityModel(ent);
    await entity.save();
    return entity;
  }

  public async getEntity(id: string): Promise<Result<Entity | HttpError>> {
    const entity = await EntityModel.findById(id);
    if (!entity) {
      return Result.Fail(new HttpError(404, 'Entity not found.'));
    }
    return Result.OK(entity);
  }

  public async updateEntity(ent: Partial<Entity>): Promise<Result<Entity | HttpError>> {
    const entity = await EntityModel.findById(ent.id);
    if (!entity) {
      return Result.Fail(new HttpError(404, 'Entity not found.'));
    }
    entity.name = ent.name || entity.name;
    await entity.save();
    return Result.OK(entity);
  }

  public async deleteEntity(id: string): Promise<Result<Entity | HttpError>> {
    const entity = await EntityModel.findById(id);
    if (!entity) {
      return Result.Fail(new HttpError(404, 'Entity not found.'));
    }
    await entity.remove();
    return Result.OK(entity);
  }
}
