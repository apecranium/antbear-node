import { App } from './app';
import { AuthenticationController } from './authentication';
import { Config } from './config';
import { Database } from './database';
import { EntityApiController, EntityController } from './entity';
import { IndexController } from './shared';
import { UserApiController, UserController } from './user';

export class Startup {
  public static db = new Database(Config.dbUri);
  public static webApp = new App(Config.webPort, '/', true, [
    new EntityController(),
    new IndexController(),
    new UserController()
  ]);
  public static apiApp = new App(Config.apiPort, '/api', false, [
    new AuthenticationController(),
    new EntityApiController(),
    new UserApiController()
  ]);

  public static async main() {
    await Startup.db.connect();
    Startup.webApp.listen();
    Startup.apiApp.listen();
  }
}

Startup.main();
