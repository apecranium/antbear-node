import { Document, model, Schema } from 'mongoose';
import { Entity } from '../entity';
import { HttpError, Result } from '../shared';

export class EntityRepository {
  private static readonly schema = new Schema<Entity>({ name: String }, { timestamps: true });
  private static readonly context = model<Entity & Document>('Entity', EntityRepository.schema);

  public async getAll(page = 1, limit = 10): Promise<Result<Entity[]>> {
    const entities = await EntityRepository.context.find({}, null, { skip: (limit * (page - 1)), limit });
    return Result.OK(entities);
  }

  public async count(filter?: string): Promise<number> {
    return await EntityRepository.context.countDocuments({ filter });
  }

  public async create(entity: Partial<Entity>): Promise<Result<Entity>> {
    const ent = await EntityRepository.context.create(entity);
    return Result.OK(ent);
  }

  public async findById(id?: string): Promise<Result<Entity | HttpError>> {
    const ent = await EntityRepository.context.findById(id);
    if (ent) {
      return Result.OK(ent);
    } else {
      return Result.Fail(new HttpError(404, 'Entity not found.'));
    }
  }

  public async update(entity: Partial<Entity>): Promise<Result<Entity | HttpError>> {
    const ent = await EntityRepository.context.findById(entity.id);
    if (!ent) {
      return Result.Fail(new HttpError(404, 'Entity not found.'));
    }
    ent.name = entity.name || ent.name;
    await ent.save();
    return Result.OK(ent);
  }

  public async delete(id: string): Promise<Result<Entity | HttpError>> {
    const ent = await EntityRepository.context.findById(id);
    if (!ent) {
      return Result.Fail(new HttpError(404, 'Entity not found.'));
    }
    await ent.remove();
    return Result.OK(ent);
  }
}
