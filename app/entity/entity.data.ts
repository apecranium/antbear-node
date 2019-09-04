import { Entity } from '../entity';

export class EntityData implements Entity {
  public id: string;
  public name: string;
  public createdOn: string;

  constructor(entity: Entity) {
    this.id = entity.id || '';
    this.name = entity.name || '';
    this.createdOn = entity.createdAt ? entity.createdAt.toString() : '';
  }
}
