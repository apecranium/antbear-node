import { App } from '@app/app';
import { Environment } from '@app/config';
import { Database } from '@app/database';
import { EntityController } from '@app/entity';
import { UserController } from '@app/user';

const env = Environment.DEV;
const db = new Database(env);
const app = new App(env.APP_PORT,
  [
    new EntityController(),
    new UserController()
  ]
);

db.connect();
app.listen();
