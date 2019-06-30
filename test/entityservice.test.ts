import test from 'tape';
import { Environment } from '../app/config';
import { Database } from '../app/database';
import { EntityService } from '../app/entity/entity.service';

const env = Environment.TEST;

test('entity service', async t => {
  const testDb = new Database(env);
  await testDb.connect();
  const entityService = new EntityService();
  const ent = await entityService.getEntities();

  t.ok(ent, 'returns a value');

  await testDb.disconnect();
  t.end();
});
