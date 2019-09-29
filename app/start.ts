import { App } from './app';
import { AuthenticationController } from './authentication';
import { Config } from './config';
import { Database } from './database';
import { EntityApiController, EntityController } from './entity';
import { IndexController } from './shared';
import { UserApiController, UserController } from './user';

export async function Start() {
  const db = new Database(Config.dbUri);

  const webApp = new App(Config.webPort, '/', true, [
    new EntityController(),
    new IndexController(),
    new UserController()
  ]);

  const apiApp = new App(Config.apiPort, '/api', false, [
    new AuthenticationController(),
    new EntityApiController(),
    new UserApiController()
  ]);

  await db.connect();
  await webApp.listen();
  await apiApp.listen();
}

(async () => {
  await Start();
})();
