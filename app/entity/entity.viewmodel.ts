import { Entity } from '../entity';

export class EntityViewModel {
  public title = 'entities';
  public maxPages: number;

  constructor(public page: number, public limit: number, public count: number, public entities: Entity[]) {
    this.maxPages = Math.ceil(count / limit);
  }
}

// { title: 'entities', entities, page, limit, count }
