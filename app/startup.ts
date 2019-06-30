import { App } from '@app/app';
import { Environment } from '@app/config';
import { Database } from '@app/database';
import { EntityController } from '@app/entity';
import { UserController } from '@app/user';

const env = Environment.DEV;
const db = new Database(env);
const app = new App(env,
  [
    new EntityController(),
    new UserController(env)
  ]
);

db.connect();
app.listen();
