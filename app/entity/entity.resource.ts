import { Entity } from '@app/entity';

export class EntityResource implements Entity {
  public id: string;
  public name: string;

  constructor(ent: Entity) {
    this.id = ent.id;
    this.name = ent.name;
  }
}
