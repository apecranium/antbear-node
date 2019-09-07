import test from 'tape';
import { Config } from '../app/config';
import { Database } from '../app/database';
import { EntityService } from '../app/entity/entity.service';

test('entity service', async t => {
  const testDb = new Database(Config.testDb);
  await testDb.connect();
  const entityService = new EntityService();
  const ent = await entityService.getEntities();

  t.ok(ent, 'returns a value');

  await testDb.disconnect();
  t.end();
});
