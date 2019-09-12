import { Entity } from '../entity';
import { HttpError } from '../shared';

export class EntityDto implements Partial<Entity> {
  public id: string;
  public name: string;

  constructor(entity: Partial<Entity>) {
    if (entity.id || entity.id === '') {
      if (!entity.id.match(/^[a-zA-Z\d]{24}$/)) {
        throw new HttpError(400, 'Invalid id.');
      }
      this.id = entity.id;
    } else {
      this.id = '';
    }
    if (entity.name || entity.name === '') {
      if (!entity.name.match(/^[a-zA-Z ]{1,32}$/)) {
        throw new HttpError(400, 'Invalid name.');
      }
      this.name = entity.name;
    } else {
      this.name = '';
    }
  }
}
