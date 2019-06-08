import { App } from '@app/app';
import Config from '@app/config';
import { Database } from '@app/database';
import { EntityController } from '@app/entity';

const db = new Database();

const app = new App(
  Config.APP_PORT,
  [
    new EntityController()
  ]
);

db.connect();
app.listen();
