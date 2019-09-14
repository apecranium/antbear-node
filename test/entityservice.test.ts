import test from 'tape';
import { Config } from '../app/config';
import { Database } from '../app/database';
import { Entity, EntityService } from '../app/entity';

test('create entity', async t => {
  const testDb = new Database(Config.testDb);
  await testDb.connect();
  const entityService = new EntityService();

  const ent = { name: 'Test' };
  const e = await entityService.createEntity(ent);
  t.ok(e.id, 'returned entity has id');
  t.ok(e.name, 'returned entity has name,');
  t.ok(e.createdAt, 'returned entity has created at,');
  t.ok(e.updatedAt, 'returned entity has updated at');

  await testDb.disconnect();
  t.end();
});

test('get entities', async t => {
  const testDb = new Database(Config.testDb);
  await testDb.connect();
  const entityService = new EntityService();

  const ent = await entityService.getEntities();
  t.ok(ent.length > 1, 'returned array contains values');

  await testDb.disconnect();
  t.end();
});
