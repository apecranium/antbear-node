import { App } from '@app/app';
import { AuthenticationController } from '@app/authentication';
import { Database } from '@app/database';
import { EntityApiController, EntityController } from '@app/entity';
import { UserApiController, UserController } from '@app/user';
import { config } from 'dotenv';

export class Startup {
  public static db = new Database();
  public static app = new App(
  [
    new EntityController(),
    new UserController()
  ],
  [
    new AuthenticationController(),
    new EntityApiController(),
    new UserApiController()
  ]);

  public static main() {
    config();
    Startup.db.connect();
    Startup.app.listen();
  }
}

Startup.main();
