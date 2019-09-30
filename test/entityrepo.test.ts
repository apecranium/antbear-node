import test from 'tape';
import { Config } from '../app/config';
import { Database } from '../app/database';
import { EntityRepository } from '../app/entity';

test('create entity', async t => {
  const testDb = new Database(Config.testDb);
  await testDb.connect();
  const entityRepo = new EntityRepository();

  const ent = { name: 'Test' };
  const e = await entityRepo.create(ent);
  t.ok(e.value.id, 'returned entity has id');
  t.ok(e.value.name, 'returned entity has name,');
  t.ok(e.value.createdAt, 'returned entity has created at,');
  t.ok(e.value.updatedAt, 'returned entity has updated at');

  await testDb.disconnect();
  t.end();
});

test('get entities', async t => {
  const testDb = new Database(Config.testDb);
  await testDb.connect();
  const entityRepo = new EntityRepository();

  const ent = await entityRepo.getAll();
  t.ok(ent.value.length > 1, 'returned array contains values');

  await testDb.disconnect();
  t.end();
});
