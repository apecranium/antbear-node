import { App } from '@app/app';
import { AuthenticationController } from '@app/authentication';
import { Database } from '@app/database';
import { EntityController } from '@app/entity';
import { UserController } from '@app/user';

export class Startup {
  public static db = new Database();
  public static app = new App([
    new AuthenticationController(),
    new EntityController(),
    new UserController()
  ]);

  public static main() {
    Startup.db.connect();
    Startup.app.listen();
  }
}

Startup.main();
