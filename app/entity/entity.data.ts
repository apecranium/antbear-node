import { Entity } from '@app/entity';

export class EntityData implements Entity {
  constructor(public id: string = '', public name: string = '') {
  }
}
