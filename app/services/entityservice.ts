import HttpException from '../exceptions/httpexception';
import IEntity from '../interfaces/ientity';
import EntityModel from '../models/entity';

export default class EntityService {

  public async getEntities(): Promise<IEntity[]> {
    try {
      const entities = await EntityModel.find({}, 'name');
      return entities;
    } catch (err) {
      throw new HttpException(500, err);
    }
  }

  public async createEntity(ent: IEntity): Promise<IEntity> {
    try {
      const entity = new EntityModel(ent);
      return await entity.save();
    } catch (err) {
      throw new HttpException(500, err);
    }
  }

  public async getEntity(id: string): Promise<IEntity> {
    try {
      return await EntityModel.findById(id);
    } catch (err) {
      throw new HttpException(500, err);
    }
  }

  public async updateEntity(id: string, name: string): Promise<IEntity> {
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

  public async deleteEntity(id: string): Promise<IEntity> {
    try {
      return await EntityModel.findByIdAndRemove(id);
    } catch (err) {
      throw new HttpException(500, err);
    }
  }
}
