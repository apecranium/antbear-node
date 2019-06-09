import { EntityResource, EntityService } from '@app/entity';

describe('entity service', () => {
  const entityService = new EntityService();
  describe('when creating an entity', () => {
    const entityData = new EntityResource({ name: 'Test' });
    it('should return that entity', () => {
      expect(entityService.createEntity(entityData)).toBeInstanceOf(Promise);
    });
  });
});
