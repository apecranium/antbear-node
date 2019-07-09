import { Entity } from '@app/entity';

export class EntityData implements Entity {
  public id: string;
  public name: string;

  constructor(entity: Entity) {
    this.id = entity.id || '';
    this.name = entity.name || '';
  }
}
