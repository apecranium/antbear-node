import { config } from 'dotenv';
import { App } from './app';
import { AuthenticationController } from './authentication';
import { Database } from './database';
import { EntityApiController, EntityController } from './entity';
import { UserApiController, UserController } from './user';
config();

export class Startup {
  public static db = new Database();
  public static webApp = new App(process.env.WEB_PORT || '8080', '/', true, [
    new EntityController(),
    new UserController()
  ]);
  public static apiApp = new App(process.env.API_PORT || '8081', '/api', false, [
    new AuthenticationController(),
    new EntityApiController(),
    new UserApiController()
  ]);

  public static main() {
    Startup.db.connect();
    Startup.webApp.listen();
    Startup.apiApp.listen();
  }
}

Startup.main();
